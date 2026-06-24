from pydantic import BaseModel
from app.models.estado import EstadoSolicitud

class ActualizarEstado(BaseModel):
    estado: EstadoSolicitud