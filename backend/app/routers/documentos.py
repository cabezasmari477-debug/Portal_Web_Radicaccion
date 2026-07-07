from fastapi import APIRouter, UploadFile, File, Form

from app.services.documento_service import guardar_documento
from app.services.database import radicaciones

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

    documento = {

        "nombre": nombre,

        "archivo": archivo.filename,

    }

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:

            solicitud["documentos"].append(documento)

            break

    return {

        "mensaje": "Documento recibido",

        "documento": documento

    }