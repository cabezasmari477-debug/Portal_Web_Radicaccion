from fastapi import APIRouter

from app.services.historial_service import obtener_historial

router = APIRouter(tags=["Historial"])


@router.get("/historial/{radicado}")

def historial(radicado: str):

    return obtener_historial(radicado)