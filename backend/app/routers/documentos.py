from fastapi import APIRouter
from fastapi import UploadFile, File, Form

from app.services.documento_service import guardar_documento

router = APIRouter(tags=["Documentos"])


@router.post("/documentos")
async def subir_documento(

    radicado: str,

    nombre: str = Form(...),

    archivo: UploadFile = File(...)

):

    contenido = await archivo.read()

    ruta = guardar_documento(

        radicado,

        archivo.filename,

        contenido

    )

    return {

        "mensaje": "Documento recibido",

        "radicado": radicado,

        "nombre": nombre,

        "archivo": archivo.filename,

        "ruta": ruta

    }