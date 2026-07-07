from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.routers import (
    radicaciones,
    documentos,
    dashboard,
    catalogos,
    auth,
    revision
)

app = FastAPI(
    title="Portal de Radicación INTECOAL",

    description="Sistema para la radicación y revisión de proyectos.",

    version="1.0.0"
)

BASE_DIR = Path(__file__).resolve().parent.parent

UPLOADS = BASE_DIR / "uploads"

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOADS),
    name="uploads"
)

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(radicaciones.router)
app.include_router(documentos.router)
app.include_router(dashboard.router)
app.include_router(catalogos.router)
app.include_router(auth.router)
app.include_router(revision.router)


@app.get("/")
def inicio():

    return {

        "mensaje": "Portal de Radicación INTECOAL"

    }