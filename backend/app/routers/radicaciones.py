from datetime import datetime
from fastapi import APIRouter
from app.schemas.proyecto import Proyecto
from app.schemas.actualizar_revision import ActualizarRevision
from app.models.estado import EstadoSolicitud
from app.services.database import (
    radicaciones,
    historial
)
from app.services.radicado_service import generar_radicado
from app.services.historial_service import registrar_evento

router = APIRouter(tags=["Radicaciones"])


@router.post("/radicacion")
def crear_radicacion(proyecto: Proyecto):

    radicado = generar_radicado()

    nueva_radicacion = {

        "radicado": radicado,

        "estado": EstadoSolicitud.RECIBIDO,

        "fecha_creacion": datetime.now().strftime("%d/%m/%Y %H:%M"),

        "proyecto": proyecto.model_dump(),

        "documentos": [],

        "observaciones": ""

    }

    radicaciones.append(nueva_radicacion)

    registrar_evento(

        radicado,

        "Solicitud creada"

    )

    historial.append({

        "radicado": radicado,

        "fecha": datetime.now().strftime("%d/%m/%Y %H:%M"),

        "accion": "Radicación creada",

        "estado": EstadoSolicitud.RECIBIDO

    })

    return nueva_radicacion

@router.get("/radicaciones")
def listar_radicaciones():

    return radicaciones

@router.get("/radicacion/{radicado}")
def obtener_radicacion(radicado: str):

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:

            return solicitud

    return {

        "mensaje": "Radicación no encontrada"

    }


@router.put("/radicacion/{radicado}/estado")
def actualizar_estado(

    radicado: str,

    datos: ActualizarRevision

):

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:

            solicitud["estado"] = datos.estado
            registrar_evento(

                radicado,

                f"Estado cambiado a {datos.estado}"

            )

            solicitud["observaciones"] = datos.observaciones

            historial.append({

                "radicado": radicado,

                "fecha": datetime.now().strftime("%d/%m/%Y %H:%M"),

                "accion": "Cambio de estado",

                "estado": datos.estado

            })

            return {

                "mensaje": "Estado actualizado correctamente",

                "radicado": radicado,

                "estado": datos.estado,

                "observaciones": datos.observaciones

            }

    return {

        "mensaje": "Radicación no encontrada"

    }


@router.get("/radicacion/{radicado}/historial")
def obtener_historial(radicado: str):

    return [

        evento

        for evento in historial

        if evento["radicado"] == radicado

    ]