from fastapi import APIRouter, UploadFile, File, Form
from app.services.documento_service import guardar_documento
from app.services.historial_service import registrar_evento
from app.services.database import radicaciones

router = APIRouter(tags=["Documentos"])


@router.post("/documentos")
async def subir_documento(

    radicado: str,

    nombre: str = Form(...),

    archivo: UploadFile = File(...)

):

    contenido = await archivo.read()

    documento = guardar_documento(

        radicado=radicado,
        nombre_archivo=archivo.filename,
        contenido=contenido

    )

    registrar_evento(

        radicado,

        f"Documento cargado: {nombre}"

    )

    for solicitud in radicaciones:

        if solicitud["radicado"] == radicado:

            solicitud["documentos"].append({

                "nombre": nombre,
                "archivo": documento["archivo"],
                "ruta": documento["ruta"]

            })

            break

    return {

        "mensaje": "Documento cargado correctamente",

        "documento": documento

    }