
function updateProgress(step){

    const progressText =
        document.getElementById("progressText");

    progressText.innerHTML =
        `Paso ${step} de 4`;

}

function nextStep(current){

    document
        .getElementById(`step${current}`)
        .classList
        .remove("active-step");

    document
        .getElementById(`step${current+1}`)
        .classList
        .add("active-step");

    document
        .getElementById(`circle${current+1}`)
        .classList
        .add("active");

    updateProgress(current+1);
    if(current + 1 === 4){

    cargarResumen();
}

}

function prevStep(current){

    document
        .getElementById(`step${current}`)
        .classList
        .remove("active-step");

    document
        .getElementById(`step${current-1}`)
        .classList
        .add("active-step");

    updateProgress(current-1);

}

async function generarRadicado() {

    const nombreProyecto =
        document.getElementById("nombreProyecto").value;

    const municipio =
        document.getElementById("municipio").value;

    const responsable =
        document.getElementById("responsable").value;

    const correo =
        document.getElementById("correo").value;

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/radicacion",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    nombre_proyecto:
                        nombreProyecto,

                    municipio:
                        municipio,

                    responsable:
                        responsable,

                    correo:
                        correo

                })
            }
        );

        const data =
            await response.json();

        document
            .getElementById(
                "resultadoRadicado"
            )
            .innerHTML =

            `
            <div class="success">

                <h3>
                    Solicitud creada
                </h3>

                <p>
                    Radicado:
                    <strong>
                        ${data.radicado}
                    </strong>
                </p>

                <p>
                    Estado:
                    ${data.estado}
                </p>

            </div>
            `;

    }
    catch(error){

        console.error(error);

    }

}

function cargarResumen(){

    const nombreProyecto =
        document.getElementById(
            "nombreProyecto"
        ).value;

    const municipio =
        document.getElementById(
            "municipio"
        ).value;

    const responsable =
        document.getElementById(
            "responsable"
        ).value;

    const correo =
        document.getElementById(
            "correo"
        ).value;

    document
        .getElementById(
            "resumenSolicitud"
        )
        .innerHTML =

        `
        <div class="summary-item">
            <strong>Proyecto:</strong>
            ${nombreProyecto}
        </div>

        <div class="summary-item">
            <strong>Municipio:</strong>
            ${municipio}
        </div>

        <div class="summary-item">
            <strong>Responsable:</strong>
            ${responsable}
        </div>

        <div class="summary-item">
            <strong>Correo:</strong>
            ${correo}
        </div>
        `;
}