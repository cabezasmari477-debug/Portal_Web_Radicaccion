from fastapi import APIRouter

from app.schemas.revision import Revision
from app.services.revision_service import (
    crear_revision,
    listar_revisiones,
    obtener_revision,
    actualizar_revision
)

router = APIRouter(tags=["Revisiones"])


@router.post("/revisiones")
def crear(datos: Revision):

    return crear_revision(datos)


@router.get("/revisiones")
def listar():

    return listar_revisiones()


@router.get("/revisiones/{radicado}")
def obtener(radicado: str):

    revision = obtener_revision(radicado)

    if revision:

        return revision

    return {

        "mensaje": "No encontrada"

    }


@router.put("/revisiones/{radicado}")
def actualizar(

    radicado: str,

    datos: Revision

):

    revision = actualizar_revision(

        radicado,

        datos

    )

    if revision:

        return revision

    return {

        "mensaje": "No encontrada"

    }