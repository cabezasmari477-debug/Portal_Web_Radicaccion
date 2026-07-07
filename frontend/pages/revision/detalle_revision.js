

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

        <h2>${solicitud.radicado}</h2>

        <p>

            <strong>Estado:</strong>

            ${solicitud.estado}

        </p>

        <hr>

        <p>

            <strong>Proyecto:</strong>

            ${solicitud.proyecto.nombre_proyecto}

        </p>

        <p>

            <strong>Tipo:</strong>

            ${solicitud.proyecto.tipo_proyecto}

        </p>

        <p>

            <strong>Municipio:</strong>

            ${solicitud.proyecto.municipio}

        </p>

        <p>

            <strong>Responsable:</strong>

            ${solicitud.proyecto.responsable}

        </p>

        <p>

            <strong>Correo:</strong>

            ${solicitud.proyecto.correo}

        </p>

    `;

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

                <strong>

                    ${doc.nombre}

                </strong>

            </div>

            <a

                href="${API}/${doc.ruta}"

                target="_blank">

                Ver documento

            </a>

        </div>

        `;

    });

}

async function cambiarEstado(estado){

    await fetch(

        `${API}/radicacion/${radicado}/estado`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                estado

            })

        }

    );

    alert("Estado actualizado correctamente");

    location.reload();

}
