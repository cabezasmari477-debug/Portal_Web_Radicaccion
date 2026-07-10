from fastapi import APIRouter

from app.services.dashboard_service import obtener_dashboard

router = APIRouter(tags=["Dashboard"])


@router.get("/dashboard")
def dashboard():

    return obtener_dashboard()