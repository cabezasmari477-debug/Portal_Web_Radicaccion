from datetime import datetime

from app.services.database import radicaciones


def obtener_dashboard():

    total_solicitudes = len(radicaciones)

    total_documentos = 0

    recibidas = 0
    revision = 0
    aprobadas = 0
    rechazadas = 0

    solicitudes_hoy = 0

    solicitudes_mes = 0

    ultimas = []

    hoy = datetime.now()

    for solicitud in radicaciones:

        total_documentos += len(

            solicitud["documentos"]

        )

        estado = solicitud["estado"]

        if estado == "RECIBIDO":

            recibidas += 1

        elif estado == "EN_REVISION":

            revision += 1

        elif estado == "APROBADO":

            aprobadas += 1

        elif estado == "RECHAZADO":

            rechazadas += 1

        fecha = solicitud.get("fecha_creacion")

        if fecha:

            try:

                fecha = datetime.strptime(

                    fecha,

                    "%d/%m/%Y %H:%M"

                )

                if fecha.date() == hoy.date():

                    solicitudes_hoy += 1

                if (

                    fecha.month == hoy.month

                    and

                    fecha.year == hoy.year

                ):

                    solicitudes_mes += 1

            except:

                pass

        ultimas.append({

            "radicado":

                solicitud["radicado"],

            "proyecto":

                solicitud["proyecto"]["nombre_proyecto"],

            "municipio":

                solicitud["proyecto"]["municipio"],

            "estado":

                solicitud["estado"],

            "fecha":

                solicitud.get(

                    "fecha_creacion",

                    ""

                )

        })

    porcentaje_aprobacion = 0

    if total_solicitudes > 0:

        porcentaje_aprobacion = round(

            aprobadas

            * 100

            / total_solicitudes,

            2

        )

    ultimas = sorted(

        ultimas,

        key=lambda x: x["fecha"],

        reverse=True

    )[:10]

    return {

        "totalSolicitudes": total_solicitudes,

        "totalDocumentos": total_documentos,

        "recibidas": recibidas,

        "enRevision": revision,

        "aprobadas": aprobadas,

        "rechazadas": rechazadas,

        "porcentajeAprobacion":

            porcentaje_aprobacion,

        "solicitudesHoy":

            solicitudes_hoy,

        "solicitudesMes":

            solicitudes_mes,

        "ultimas":

            ultimas

    }