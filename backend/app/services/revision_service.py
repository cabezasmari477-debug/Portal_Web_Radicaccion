from app.services.database import revisiones


def crear_revision(revision):

    nueva = revision.model_dump()

    revisiones.append(nueva)

    return nueva


def listar_revisiones():

    return revisiones


def obtener_revision(radicado):

    for revision in revisiones:

        if revision["radicado"] == radicado:

            return revision

    return None


def actualizar_revision(radicado, datos):

    for revision in revisiones:

        if revision["radicado"] == radicado:

            revision["documentos"] = datos.documentos

            return revision

    return None