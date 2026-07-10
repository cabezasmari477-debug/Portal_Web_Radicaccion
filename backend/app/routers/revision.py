from fastapi import APIRouter

from app.services.database import radicaciones


router = APIRouter(tags=["Revisión"])

@router.get("/revision")

def obtener_solicitudes():

    return radicaciones


@router.get("/revision/{radicado}")

def obtener_revision(radicado: str):

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:

            return solicitud

    return {

        "mensaje": "Solicitud no encontrada"

    }


@router.get("/revision/estado/{estado}")

def filtrar_estado(estado: str):

    return [

        solicitud

        for solicitud in radicaciones

        if solicitud["estado"] == estado

    ]


@router.get("/revision/buscar/{texto}")

def buscar(texto: str):

    texto = texto.lower()

    resultados = []

    for solicitud in radicaciones:

        proyecto = solicitud["proyecto"]

        if (

            texto in solicitud["radicado"].lower()

            or

            texto in proyecto["nombre_proyecto"].lower()

            or

            texto in proyecto["municipio"].lower()

            or

            texto in proyecto["responsable"].lower()

        ):

            resultados.append(solicitud)

    return resultados