const API = "http://127.0.0.1:8000";

function updateProgress(step){

    const progressText =
        document.getElementById("progressText");

    progressText.innerHTML =
        `Paso ${step} de 4`;

}

async function cargarTiposProyecto() {

    try {

        const respuesta = await fetch(`${API}/tipos-proyecto`);
        
        const tipos = await respuesta.json();

        const select = document.getElementById("tipoProyecto");

        tipos.forEach(tipo => {

            const option = document.createElement("option");

            option.value = tipo;

            option.textContent = tipo;

            select.appendChild(option);

        });

    } catch (error) {

        console.error(error);

    }

}

async function cargarDocumentos() {

    const tipo = document.getElementById("tipoProyecto").value;

    if (!tipo) return;

    try {

        const respuesta = await fetch(`${API}/documentos/${encodeURIComponent(tipo)}`);

        const documentos = await respuesta.json();

        mostrarDocumentos(documentos);

    } catch (error) {

        console.error(error);

    }

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
            `${API}/radicacion`,
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

document.addEventListener("DOMContentLoaded", () => {

    cargarTiposProyecto();

    document
        .getElementById("tipoProyecto")
        .addEventListener("change", cargarDocumentos);

});


function mostrarDocumentos(documentos) {

    const contenedor =
        document.getElementById("contenedorDocumentos");

    contenedor.innerHTML = "";

    documentos.forEach(doc => {

        contenedor.innerHTML += `

        <div class="document-card">

            <h4>📄 ${doc.nombre}</h4>

            <p>

                ${
                    doc.obligatorio
                    ? "Documento obligatorio"
                    : "Documento opcional"
                }

            </p>

            <input
                type="file"
                accept=".pdf">

        </div>

        `;

    });

    agregarTarjetaNuevoDocumento();

}

function agregarTarjetaNuevoDocumento(){

    const contenedor =
        document.getElementById("contenedorDocumentos");

    contenedor.innerHTML += `

    <div
        class="document-card add-document"
        onclick="mostrarFormularioNuevoDocumento()">

        <h4>➕ Agregar documento adicional</h4>

        <p>

            Adjunte cualquier documento adicional
            relacionado con el proyecto.

        </p>

    </div>

    `;

}

function mostrarFormularioNuevoDocumento(){

    const contenedor =
        document.getElementById("contenedorDocumentos");

    contenedor.innerHTML += `

    <div
        class="document-card"
        id="nuevoDocumento">

        <input
            id="nombreDocumentoNuevo"
            type="text"
            placeholder="Nombre del documento">

        <input
            id="archivoDocumentoNuevo"
            type="file"
            accept=".pdf">

        <button
            onclick="guardarDocumentoNuevo()">

            Guardar

        </button>

    </div>

    `;

}

function guardarDocumentoNuevo(){

    alert("En el siguiente paso guardaremos el documento.");

}
