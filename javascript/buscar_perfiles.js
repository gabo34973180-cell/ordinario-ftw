let usuariosGuardados = [];

const xhttp = new XMLHttpRequest();

xhttp.onload = function () {

    const xmlDoc = xhttp.responseXML;

    if (!xmlDoc) {
        console.error("No se pudo leer usuarios.xml");
        return;
    }

    usuariosGuardados = [
        ...xmlDoc.getElementsByTagName("usuario")
    ];
};

xhttp.open("GET", "../xml/usuarios.xml");
xhttp.send();

export function iniciarBusquedaPerfiles(texto) {
    console.log(texto);

    texto = texto.toLowerCase();

    const usuariosFiltrados = usuariosGuardados.filter(
        usuario => {

            const nombre =
                usuario
                    .getElementsByTagName("nombre")[0]
                    .textContent
                    .toLowerCase();

            return nombre.includes(texto);
        }
    );

    mostrarUsuarios(usuariosFiltrados);
}

function mostrarUsuarios(usuarios) {

    const lista = document.getElementById("listarPerfiles");

    if (!lista) return;

    lista.innerHTML = "";

    for (let i = 0; i < usuarios.length; i++) {

    const nombre = usuarios[i].getElementsByTagName("nombre")[0].textContent;
    
        let panelPersonas = document.createElement("div");
        panelPersonas.classList.add("panel-personas");

        let infoTexto = document.createElement("div");
        infoTexto.classList.add("info-persona-texto");

        panelPersonas.appendChild(infoTexto);

        let titulo = document.createElement("h3");
        titulo.textContent = nombre;

        infoTexto.appendChild(titulo);

        let btnVerPerfil = document.createElement("button");
        btnVerPerfil.textContent = "Ver perfil";
        btnVerPerfil.classList.add("btn-ver-perfil");

        panelPersonas.appendChild(btnVerPerfil);

        lista.appendChild(panelPersonas);
        btnVerPerfil.addEventListener("click", () => {

            sessionStorage.setItem(
                "perfilSeleccionado",
                nombre
            );

            window.location.href = "perfil.html";
        });

    }
}