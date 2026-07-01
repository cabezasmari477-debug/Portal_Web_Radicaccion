from fastapi import APIRouter

from app.catalogos.proyectos import TIPOS_PROYECTO
from app.catalogos.documentos import DOCUMENTOS

router = APIRouter()


@router.get("/tipos-proyecto")
def obtener_tipos():

    return TIPOS_PROYECTO


@router.get("/documentos/{tipo}")
def obtener_documentos(tipo: str):

    return DOCUMENTOS.get(tipo, [])