from pydantic import BaseModel

class DocumentoRevision(BaseModel):

    nombre: str

    estado: str

    observacion: str = ""


class Revision(BaseModel):

    radicado: str

    documentos: list[DocumentoRevision]

    