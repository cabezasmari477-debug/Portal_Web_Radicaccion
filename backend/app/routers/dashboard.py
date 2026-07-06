from fastapi import APIRouter

from app.services.database import radicaciones
from app.models.estado import EstadoSolicitud

router = APIRouter(tags=["Dashboard"])


@router.get("/dashboard")
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