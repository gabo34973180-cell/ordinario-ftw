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

        const nombre =
            usuarios[i]
                .getElementsByTagName("nombre")[0]
                .textContent;

        const li = document.createElement("li");

        li.textContent = nombre;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {

            localStorage.setItem(
                "perfilSeleccionado",
                nombre
            );

            window.location.href = "perfil.html";
        });

        lista.appendChild(li);
    }
}