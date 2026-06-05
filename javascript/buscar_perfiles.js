export function iniciarBusquedaPrefiles() {
    const txtBuscar = document.getElementById('txtBuscarPerfil')
    if (!txtBuscar) return;
    
    txtBuscar.addEventListener("keyup", buscarUsuarios);

}

function buscarUsuarios() {
    const texto = document.getElementById("txtBuscarPerfil").value.toLowerCase();
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        const xmlDoc = xhttp.responseXML;
        const usuarios = xmlDoc.getElementsByTagName("usuario");

        mostrarUsuarios(texto, usuarios);
    }
    xhttp.open("GET", "../xml/usuarios.xml")
    xhttp.send();
}

function mostrarUsuarios(texto, usuarios) {
    const lista = document.getElementById("listarPerfiles");
    lista.innerHTML = "";
    for (let i = 0; i < usuarios.length; i ++){
        const nombre = usuarios[i].getElementsByTagName("nombre")[0].textContent;
        if (nombre.toLowerCase().includes(texto)){
            const li = document.createElement("li");
            li.textContent = nombre;
            li.style.cursor = "pointer";
            li.addEventListener("click", function (){
                localStorage.setItem("perfilSeleccionado", nombre);
                window.location.href = "perfil.html";
            })
        }
    }
}