const API="http://127.0.0.1:8000";

const radicado=

localStorage.getItem("radicado");

window.onload=()=>{

cargar();

}

async function cargar(){

const response=

await fetch(

`${API}/radicacion/${radicado}`

);

const datos=

await response.json();

document.getElementById(

"cabecera"

).innerHTML=`

<div class="card">

<h2>${datos.proyecto.nombre_proyecto}</h2>

<p>

<b>Radicado:</b>

${datos.radicado}

</p>

<p>

<b>Municipio:</b>

${datos.proyecto.municipio}

</p>

<p>

<b>Responsable:</b>

${datos.proyecto.responsable}

</p>

<p>

<b>Correo:</b>

${datos.proyecto.correo}

</p>

</div>

`;

cargarDocumentos();

}

async function cargarDocumentos(){

const response=

await fetch(

`${API}/documentos/${radicado}`

);

const documentos=

await response.json();

const div=

document.getElementById(

"documentos"

);

div.innerHTML="";

documentos.forEach(doc=>{

div.innerHTML+=`

<div class="card">

<h3>

${doc.nombre}

</h3>

<button>

Ver documento

</button>

</div>

`;

});

}