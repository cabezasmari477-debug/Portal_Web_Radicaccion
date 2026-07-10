import os
from pathlib import Path

UPLOAD_FOLDER = "uploads"


def guardar_documento(radicado: str, nombre_archivo: str, contenido: bytes):

    carpeta = Path(UPLOAD_FOLDER) / radicado

    carpeta.mkdir(
        parents=True,
        exist_ok=True
    )

    ruta_archivo = carpeta / nombre_archivo

    with open(ruta_archivo, "wb") as archivo:
        archivo.write(contenido)

    return {
        "nombre": nombre_archivo,
        "archivo": nombre_archivo,
        "ruta": str(ruta_archivo).replace("\\", "/"),
        "radicado": radicado
    }


def eliminar_documento(ruta: str):

    try:

        if os.path.exists(ruta):

            os.remove(ruta)

            return True

    except Exception as error:

        print(error)

    return False


def existe_documento(ruta: str):

    return os.path.exists(ruta)