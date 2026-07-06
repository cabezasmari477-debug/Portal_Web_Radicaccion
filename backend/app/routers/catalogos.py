from fastapi import APIRouter

from app.services.catalogo_service import TIPOS_PROYECTO
from app.catalogos.documentos import DOCUMENTOS

router = APIRouter(tags=["Catálogos"])


@router.get("/tipos-proyecto")
def listar_tipos():

    return TIPOS_PROYECTO


@router.get("/documentos/{tipo_proyecto}")
def listar_documentos(tipo_proyecto: str):

    return DOCUMENTOS.get(tipo_proyecto, [])