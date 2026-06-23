contador = 1

def generar_radicado():
    global contador

    radicado = f"RAD-2026-{contador:06d}"

    contador += 1

    return radicado
