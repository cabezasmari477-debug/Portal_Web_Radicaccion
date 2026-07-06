from fastapi import APIRouter

from app.schemas.proyecto import Proyecto
from app.schemas.actualizar_estado import ActualizarEstado
from app.services.radicado_service import generar_radicado
from app.services.database import radicaciones
from app.models.estado import EstadoSolicitud

router = APIRouter(tags=["Radicaciones"])


@router.post("/radicacion")
def crear_radicacion(proyecto: Proyecto):

    radicado = generar_radicado()

    nueva_radicacion = {

        "radicado": radicado,

        "estado": EstadoSolicitud.RECIBIDO,

        "proyecto": proyecto.model_dump()

    }

    radicaciones.append(nueva_radicacion)

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

    datos: ActualizarEstado

):

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:

            solicitud["estado"] = datos.estado

            return {

                "mensaje": "Estado actualizado correctamente",

                "radicado": radicado,

                "estado": datos.estado

            }

    return {

        "mensaje": "Radicación no encontrada"

    }