const API = "http://127.0.0.1:8000";

const radicado =
    localStorage.getItem("radicadoActual");

window.onload = () => {

    cargarSolicitud();

};

async function cargarSolicitud(){

    const response =
        await fetch(

            `${API}/radicacion/${radicado}`

        );

    const solicitud =
        await response.json();

    mostrarInformacion(solicitud);

    mostrarDocumentos(solicitud.documentos);

}

function mostrarInformacion(solicitud){

    document
        .getElementById("informacionSolicitud")
        .innerHTML = `

        <h2>

            ${solicitud.radicado}

        </h2>

        <br>

        <div class="info-grid">

            <div class="info-box">

                <strong>Estado</strong>

                <span>${solicitud.estado}</span>

            </div>

            <div class="info-box">

                <strong>Proyecto</strong>

                <span>${solicitud.proyecto.nombre_proyecto}</span>

            </div>

            <div class="info-box">

                <strong>Tipo</strong>

                <span>${solicitud.proyecto.tipo_proyecto}</span>

            </div>

            <div class="info-box">

                <strong>Municipio</strong>

                <span>${solicitud.proyecto.municipio}</span>

            </div>

            <div class="info-box">

                <strong>Responsable</strong>

                <span>${solicitud.proyecto.responsable}</span>

            </div>

            <div class="info-box">

                <strong>Correo</strong>

                <span>${solicitud.proyecto.correo}</span>

            </div>

        </div>

    `;

    document.getElementById(

        "observaciones"

    ).value =

        solicitud.observaciones || "";

}

function mostrarDocumentos(documentos){

    const lista =
        document.getElementById("listaDocumentos");

    lista.innerHTML = "";

    documentos.forEach(doc=>{

        lista.innerHTML += `

        <div class="documento-item">

            <div>

                📄

                <strong>${doc.nombre}</strong>

                <br>

                <small>${doc.archivo}</small>

            </div>

            <button

                onclick="abrirPdf('${API}/${doc.ruta}')">

                Ver documento

            </button>

        </div>

        `;

    });

}

async function cambiarEstado(estado){

    const observaciones =

        document.getElementById(

            "observaciones"

        ).value;

    await fetch(

        `${API}/radicacion/${radicado}/estado`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                estado,

                observaciones

            })

        }

    );

    alert("Solicitud actualizada correctamente.");

    location.reload();

}