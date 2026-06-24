from fastapi import FastAPI
from app.schemas.proyecto import Proyecto
from app.services.radicado_service import generar_radicado
from app.services.database import radicaciones
from fastapi import UploadFile, File
from app.services.documento_service import guardar_documento
from app.models.estado import EstadoSolicitud
from app.schemas.actualizar_estado import ActualizarEstado
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

@app.get("/")
def inicio():
    return {
        "mensaje": "Portal de Radicación INTECOAL"
    }
@app.post("/radicacion")
def crear_radicacion(proyecto: Proyecto):

    radicado = generar_radicado()

    nueva_radicacion = {
        "radicado":radicado,
        "estado": EstadoSolicitud.RECIBIDO,
        "proyecto": proyecto.model_dump()
    }

    radicaciones.append(nueva_radicacion)

    return nueva_radicacion

@app.get("/radicaciones")
def listar_radicaciones():
    return radicaciones

@app.get("/radicacion/{radicado}")
def obtener_radicacion(radicado: str):

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:
            return solicitud

    return {
        "mensaje": "Radicación no encontrada"
    }

@app.put("/radicacion/{radicado}/estado")
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

@app.post("/documentos")
async def subir_documento(
    radicado: str,
    archivo: UploadFile = File(...)
):
    contenido = await archivo.read()

    ruta = guardar_documento(
        radicado,
        archivo.filename,
        contenido
    )

    return {
    "mensaje": "Documento subido correctamente",
    "radicado": radicado,
    "archivo": archivo.filename,
    "ruta": ruta
    }

@app.get("/dashboard")
def dashboard():

    total = len(radicaciones)

    recibidas = sum(
        1 for r in radicaciones
        if r["estado"] == EstadoSolicitud.RECIBIDO
    )

    en_revision = sum(
        1 for r in radicaciones
        if r["estado"] == EstadoSolicitud.EN_REVISION
    )

    aprobadas = sum(
        1 for r in radicaciones
        if r["estado"] == EstadoSolicitud.APROBADO
    )

    rechazadas = sum(
        1 for r in radicaciones
        if r["estado"] == EstadoSolicitud.RECHAZADO
    )

    return {
        "total": total,
        "recibidas": recibidas,
        "en_revision": en_revision,
        "aprobadas": aprobadas,
        "rechazadas": rechazadas
    }