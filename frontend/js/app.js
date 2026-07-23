const API = "http://127.0.0.1:8000";

let documentosProyecto = {

    obligatorios: [],

    adicionales: []

};

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
    console.log("SE EJECUTÓ cargarDocumentos");

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

async function generarRadicado(){
    console.log("Generando radicado...");

    const nombreProyecto =
        document.getElementById("nombreProyecto").value;

    const municipio =
        document.getElementById("municipio").value;

    const responsable =
        document.getElementById("responsable").value;

    const correo =
        document.getElementById("correo").value;

    try{

        const tipoProyecto =
            document.getElementById("tipoProyecto").value;

        const respuesta =
            await fetch(`${API}/documentos/${encodeURIComponent(tipoProyecto)}`);

        const documentos =
            await respuesta.json();

        const obligatorios =
            documentos.filter(d => d.obligatorio);

        const faltantes = obligatorios.filter(doc =>

            !documentosProyecto.obligatorios.some(

                archivo => archivo.nombre === doc.nombre

            )

        );

        if(faltantes.length > 0){

            alert(

                "Faltan documentos obligatorios:\n\n" +

                faltantes.map(d=>"• "+d.nombre).join("\n")

            );

            return;

        }

        const response = await fetch(

            `${API}/radicacion`,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body: JSON.stringify({

                    nombre_proyecto: nombreProyecto,

                    tipo_proyecto:
                        document.getElementById("tipoProyecto").value,

                    municipio: municipio,

                    responsable: responsable,

                    correo: correo

                })

            }

        );

        const data = await response.json();

        await subirDocumentos(data.radicado);

        document
            .getElementById("resultadoRadicado")
            .innerHTML =

            `

            <div class="success">

                <h3>

                    ✅ Solicitud creada correctamente

                </h3>

                <p>

                    <strong>

                        Radicado:

                    </strong>

                    ${data.radicado}

                </p>

                <p>

                    <strong>

                        Estado:

                    </strong>

                    ${data.estado}

                </p>

            </div>

            `;

        document
            .getElementById("resultadoRadicado")
            .scrollIntoView({

                behavior:"smooth"

            });

    }

    catch(error){

        console.error(error);

    }

    console.log("Radicado generado.");
}

async function subirDocumentos(radicado){

    const todosLosDocumentos = [

        ...documentosProyecto.obligatorios,

        ...documentosProyecto.adicionales

    ];

    let cantidad = 0;

    for(const documento of todosLosDocumentos){

        if(!documento.archivo){
            continue;
        }

        const formData = new FormData();

        formData.append(
            "archivo",
            documento.archivo
        );

        formData.append(
            "nombre",
            documento.nombre
        );

        const respuesta = await fetch(

            `${API}/documentos?radicado=${radicado}`,

            {

                method:"POST",

                body:formData

            }

        );

        if(!respuesta.ok){

            console.error(
                "Error subiendo:",
                documento.nombre
            );

            continue;

        }

        const resultado = await respuesta.json();

        console.log(resultado);

        cantidad++;

    }

    return cantidad;

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


function mostrarDocumentos(documentos){

    const lista = document.getElementById("contenedorDocumentos");

    if(!lista){
        console.error("No existe contenedorDocumentos");
        return;
    }

    lista.innerHTML = "";

    documentosProyecto.obligatorios = [];

    documentos.forEach(doc=>{

        lista.innerHTML += `

        <div class="document-card">

            <h4>${doc.nombre}</h4>

            <p>

                ${doc.obligatorio ? "Obligatorio" : "Opcional"}

            </p>

            <input
                type="file"
                accept=".pdf"
                onchange="guardarDocumentoObligatorio(event,'${doc.nombre}')">

        </div>

        `;

    });

    agregarTarjetaNuevoDocumento();

}

function abrirPdf(ruta){

    document
        .getElementById("visorPdf")
        .src = ruta;

    document
        .getElementById("modalPdf")
        .style
        .display = "flex";

}

function cerrarPdf(){

    document
        .getElementById("visorPdf")
        .src = "";

    document
        .getElementById("modalPdf")
        .style
        .display = "none";

}

function guardarDocumentoObligatorio(event, nombreDocumento){

    const archivo = event.target.files[0];

    if(!archivo){

        return;

    }

    const existente =
        documentosProyecto.obligatorios.find(

            d => d.nombre === nombreDocumento

        );

    if(existente){

        existente.archivo = archivo;

    }else{

        documentosProyecto.obligatorios.push({

            nombre: nombreDocumento,

            archivo: archivo

        });

    }

    const anterior =
        event.target.parentElement.querySelector(".archivo-seleccionado");

    if(anterior){

        anterior.remove();

    }

    event.target.insertAdjacentHTML(

        "afterend",

        `<p class="archivo-seleccionado">✔ ${archivo.name}</p>`

    );

    

}

function agregarTarjetaNuevoDocumento(){

    if(document.querySelector(".add-document")){

        return;

    }

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

function mostrarFormularioNuevoDocumento() {

    // Evitar abrir varios formularios
    if (document.getElementById("nuevoDocumento")) {
        return;
    }

    const tarjetaAgregar =
        document.querySelector(".add-document");

    const formulario = document.createElement("div");

    formulario.className = "document-card";

    formulario.id = "nuevoDocumento";

    formulario.innerHTML = `

        <h4>Nuevo documento</h4>

        <input
            type="text"
            id="nombreDocumentoNuevo"
            placeholder="Nombre del documento">

        <input
            type="file"
            id="archivoDocumentoNuevo"
            accept=".pdf">

        <div class="buttons">

            <button onclick="guardarDocumentoNuevo()">
                Guardar
            </button>

            <button onclick="cancelarDocumentoNuevo()">
                Cancelar
            </button>

        </div>

    `;

    tarjetaAgregar.before(formulario);

}

function cancelarDocumentoNuevo() {

    document
        .getElementById("nuevoDocumento")
        ?.remove();

}

function guardarDocumentoNuevo() {

    const nombre =
        document
        .getElementById("nombreDocumentoNuevo")
        .value
        .trim();

    const archivo =
        document
        .getElementById("archivoDocumentoNuevo")
        .files[0];

    if (!nombre) {

        alert("Ingrese el nombre del documento.");

        return;

    }

    if (!archivo) {

        alert("Seleccione un archivo.");

        return;

    }

    documentosProyecto.adicionales.push({

        nombre: nombre,

        archivo: archivo

    });

    document
        .getElementById("nuevoDocumento")
        .remove();

    document
        .querySelector(".add-document")
        ?.remove();

    crearTarjetaDocumento(

        nombre,

        archivo.name

    );

    agregarTarjetaNuevoDocumento();

}

function crearTarjetaDocumento(nombre, archivo){

    const tarjeta = document.createElement("div");

    tarjeta.className =

        "document-card documento-extra";

    tarjeta.innerHTML = `

        <h4>📄 ${nombre}</h4>

        <p class="archivo-seleccionado">

            ✔ ${archivo}

        </p>

        <button
            class="btn-eliminar">

            🗑 Eliminar

        </button>

    `;

    tarjeta
        .querySelector(".btn-eliminar")
        .onclick = function(){

            tarjeta.remove();

        };

    document
        .getElementById("contenedorDocumentos")
        .appendChild(tarjeta);

}

async function abrirRevision(radicado){

    localStorage.setItem(

        "radicado",

        radicado

    );

    window.location=

        "detalle_revision.html";

}

