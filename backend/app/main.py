from fastapi import FastAPI
from app.schemas.proyecto import Proyecto
from app.services.radicado_service import generar_radicado

app = FastAPI()

@app.get("/")
def inicio():
    return {
        "mensaje": "Portal de Radicación INTECOAL"
    }
@app.post("/radicacion")
def crear_radicacion(proyecto: Proyecto):
    radicado = generar_radicado()
    return {
        "radicado":radicado,
        "estado": "recibido",
        "proyecto": proyecto.model_dump()
    }