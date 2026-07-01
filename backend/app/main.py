from fastapi import FastAPI

from app.routers import (
    radicaciones,
    documentos,
    dashboard,
    catalogos
)

app = FastAPI(
    title="Portal de Radicación INTECOAL"
)

app.include_router(radicaciones.router)

app.include_router(documentos.router)

app.include_router(dashboard.router)

app.include_router(catalogos.router)


@app.get("/")
def inicio():

    return {
        "mensaje": "Portal de Radicación INTECOAL"
    }