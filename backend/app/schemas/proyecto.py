from pydantic import BaseModel

class Proyecto(BaseModel):
    nombre_proyecto: str
    municipio: str
    responsable: str
    correo: str