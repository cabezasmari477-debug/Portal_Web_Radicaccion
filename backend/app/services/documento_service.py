import os 

UPLOAD_FOLDER = "uploads"

def guardar_documento(radicado, nombre_archivo, contenido):
    
    carpeta_radicado = os.path.join(
        UPLOAD_FOLDER,
        radicado
    )
    
    os.makedirs(
        carpeta_radicado, 
        exist_ok=True
    )

    ruta = os.path.join(
        carpeta_radicado, 
        nombre_archivo
    )

    with open(ruta, "wb") as archivo:
        archivo.write(contenido)
        
    return ruta