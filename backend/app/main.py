from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    radicaciones,
    documentos,
    dashboard,
    catalogos,
    auth
)

from app.routers import revision


app = FastAPI()

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