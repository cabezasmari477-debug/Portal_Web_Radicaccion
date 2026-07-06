from app.services.database import radicaciones
from app.services.radicado_service import generar_radicado
from app.models.estado import EstadoSolicitud


def crear_radicacion(proyecto):

    radicado = generar_radicado()

    nueva_radicacion = {

        "radicado": radicado,

        "estado": EstadoSolicitud.RECIBIDO,

        "proyecto": proyecto.model_dump()

    }

    radicaciones.append(nueva_radicacion)

    return nueva_radicacion

def listar_radicaciones():

    return radicaciones

def obtener_radicacion(radicado):

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:

            return solicitud

    return None

def actualizar_estado(radicado, estado):

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:

            solicitud["estado"] = estado

            return solicitud

    return None