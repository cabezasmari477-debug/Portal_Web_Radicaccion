from enum import Enum

class EstadoSolicitud(str, Enum):
    BORRADOR = "BORRADOR"
    RECIBIDO = "RECIBIDO"
    EN_REVISION = "EN_REVISION"
    APROBADO = "APROBADO"
    RECHAZADO = "RECHAZADO"
    