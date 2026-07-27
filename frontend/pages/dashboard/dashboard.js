const API = "http://127.0.0.1:8000";

window.onload = () => {

    cargarDashboard();

};

async function cargarDashboard(){

    try{

        const response = await fetch(`${API}/dashboard`);

        const data = await response.json();

        llenarIndicadores(data);

        llenarTabla(data.ultimas);

    }

    catch(error){

        console.error(error);

        alert("No fue posible cargar el dashboard.");

    }

}

function llenarIndicadores(data){

    document.getElementById("totalSolicitudes").textContent =
        data.totalSolicitudes;

    document.getElementById("totalDocumentos").textContent =
        data.totalDocumentos;

    document.getElementById("recibidas").textContent =
        data.recibidas;

    document.getElementById("enRevision").textContent =
        data.enRevision;

    document.getElementById("aprobadas").textContent =
        data.aprobadas;

    document.getElementById("rechazadas").textContent =
        data.rechazadas;

    document.getElementById("solicitudesHoy").textContent =
        data.solicitudesHoy;

    document.getElementById("solicitudesMes").textContent =
        data.solicitudesMes;

    document.getElementById("porcentajeAprobacion").textContent =
        data.porcentajeAprobacion + "%";

}

function llenarTabla(lista){

    const tabla = document.getElementById("tablaSolicitudes");

    tabla.innerHTML = "";

    lista.forEach(item=>{

        let claseEstado = "";

        switch(item.estado){

            case "RECIBIDO":
                claseEstado = "recibido";
                break;

            case "EN_REVISION":
                claseEstado = "revision";
                break;

            case "APROBADO":
                claseEstado = "aprobado";
                break;

            case "RECHAZADO":
                claseEstado = "rechazado";
                break;

            default:
                claseEstado = "";

        }

        tabla.innerHTML += `

        <tr>

            <td>${item.radicado}</td>

            <td>${item.proyecto}</td>

            <td>${item.municipio}</td>

            <td>${item.responsable ?? "-"}</td>

            <td>

                <span class="estado ${claseEstado}">

                    ${item.estado}

                </span>

            </td>

            <td>${item.fecha}</td>

        </tr>

        `;

    });

}