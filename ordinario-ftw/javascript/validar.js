export function cargar() {

    let txtUsuario = document.getElementById("txtUsuario");
    let txtPassword = document.getElementById("txtPassword");

    if (!txtUsuario || !txtPassword) return;

    txtUsuario.style.backgroundColor = "";
    txtPassword.style.backgroundColor = "";

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {

        const xmlDoc = xhttp.responseXML;

        const nombrexml = xmlDoc.getElementsByTagName("nombre");
        const contrasenaxml = xmlDoc.getElementsByTagName("password");

        if (validar(nombrexml, contrasenaxml, txtUsuario.value, txtPassword.value)) {

 
            localStorage.setItem("usuarioLogueado", txtUsuario.value);

            irPrincipal();

        } else {

            pintarojo(txtUsuario, txtPassword);

        }
    }

    xhttp.open("GET", "../xml/usuarios.xml");
    xhttp.send();
}

function validar(nombrexml, contrasenaxml, nombre, contrasena) {

    for (let i = 0; i < nombrexml.length; i++) {

        if (
            nombrexml[i].textContent === nombre &&
            contrasenaxml[i].textContent === contrasena
        ) {
            return true;
        }
    }

    return false;
}

function pintarojo(txtUsuario, txtPassword) {

    txtUsuario.style.backgroundColor = "red";
    txtPassword.style.backgroundColor = "red";

}

export function irPrincipal() {
    window.location.href = "principal.html";
}

export function irInicioSesion() {
    window.location.href = "inicio_sesion.html";
}


export function irGrupos() {
    window.location.href = "grupos.html";
}

export function irPerfil() {
    localStorage.removeItem("perfilSellecionado");
    window.location.href = "perfil.html";
}

export function irhome() {
    window.location.href = "principal.html";
}


export function cerrarSesion() {

    localStorage.removeItem("usuarioLogueado");
    window.location.href = "inicio_sesion.html";

}

export function irRegistro() {
    window.location.href = "registrarse.html";
}