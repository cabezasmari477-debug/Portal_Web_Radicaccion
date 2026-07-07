


let solicitudes = [];

window.onload = async () => {

    await cargarSolicitudes();

};

async function cargarSolicitudes(){

    try{

        const response = await fetch(`${API}/radicaciones`);

        solicitudes = await response.json();

        pintarSolicitudes(solicitudes);

    }catch(error){

        console.error(error);

    }

}

function pintarSolicitudes(lista){

    const contenedor =
        document.getElementById("listaSolicitudes");

    contenedor.innerHTML = "";

    lista.forEach(solicitud=>{

        contenedor.innerHTML += `

        <div class="solicitud-card">

            <div class="card-header">

                <h2>${solicitud.radicado}</h2>

                <span class="estado">

                    ${solicitud.estado}

                </span>

            </div>

            <div class="card-body">

                <div>

                    <strong>Proyecto</strong>

                    <p>${solicitud.proyecto.nombre_proyecto}</p>

                </div>

                <div>

                    <strong>Municipio</strong>

                    <p>${solicitud.proyecto.municipio}</p>

                </div>

                <div>

                    <strong>Responsable</strong>

                    <p>${solicitud.proyecto.responsable}</p>

                </div>

            </div>

            <div class="card-footer">

                <button
                    onclick="abrirSolicitud('${solicitud.radicado}')">

                    Revisar solicitud

                </button>

            </div>

        </div>

        `;

    });

}

function abrirSolicitud(radicado){

    localStorage.setItem(

        "radicadoActual",

        radicado

    );

    window.location.href =

        "detalle_revision.html";

}

document
    .getElementById("buscar")
    .addEventListener("keyup", buscarSolicitudes);

function buscarSolicitudes(){

    const texto =
        document
            .getElementById("buscar")
            .value
            .toLowerCase();

    const resultado = solicitudes.filter(s =>

        s.radicado.toLowerCase().includes(texto)

        ||

        s.proyecto.nombre_proyecto.toLowerCase().includes(texto)

        ||

        s.proyecto.municipio.toLowerCase().includes(texto)

        ||

        s.proyecto.responsable.toLowerCase().includes(texto)

    );

    pintarSolicitudes(resultado);

}