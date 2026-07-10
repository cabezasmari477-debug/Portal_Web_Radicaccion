from datetime import datetime

from app.services.database import historial


def registrar_evento(

    radicado: str,

    evento: str,

    usuario: str = "Sistema"

):

    historial.append({

        "radicado": radicado,

        "evento": evento,

        "usuario": usuario,

        "fecha": datetime.now().strftime(

            "%d/%m/%Y %H:%M"

        )

    })


def obtener_historial(radicado: str):

    return [

        item

        for item in historial

        if item["radicado"] == radicado

    ]