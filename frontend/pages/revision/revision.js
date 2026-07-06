const API="http://127.0.0.1:8000";

window.onload=()=>{

cargarSolicitudes();

}

async function cargarSolicitudes(){

const response=

await fetch(`${API}/radicaciones`);

const datos=

await response.json();

mostrar(datos);

}

function mostrar(datos){

const lista=

document.getElementById("lista");

lista.innerHTML="";

datos.forEach(s=>{

lista.innerHTML+=`

<div class="solicitud">

<div class="info">

<h3>${s.radicado}</h3>

<p>

${s.proyecto.nombre_proyecto}

</p>

<p>

${s.proyecto.municipio}

</p>

<div class="estado">

${s.estado}

</div>

</div>

<div>

<button onclick="abrir('${s.radicado}')">

Revisar

</button>

</div>

</div>

`;

});

}

function abrir(radicado){

localStorage.setItem(

"radicado",

radicado

);

window.location=

"detalle.html";

}