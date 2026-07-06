from fastapi import APIRouter

router = APIRouter(tags=["Autenticación"])


@router.get("/login")
def login():

    return {

        "mensaje": "Módulo de autenticación en desarrollo"

    }