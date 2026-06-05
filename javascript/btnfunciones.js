import * as miModulo from "./validar.js";
import * as registrarse from "./registrarse.js";
import * as publicaciones from "./publicaciones.js";
import * as cargarGrupos from "./grupos.js";
import * as cargarPerfil from "./perfil.js";
import * as notificaciones from "./notificaciones.js";
import * as buscadorPerfiles from "./buscar_perfiles.js";
import * as configuracion from "./configuracion.js";

if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("dark-mode");
}

const btnIniciarSesion = document.getElementById("btnIniciarSesion");
const btnIrRegistro = document.getElementById("btnIrRegistro");
const btnCrearCuenta = document.getElementById("btnCrearCuenta");

let imgs = document.getElementsByClassName("imgs")


if (btnIniciarSesion) {
    btnIniciarSesion.addEventListener("click", miModulo.cargar);
}
if (btnIrRegistro) {
    btnIrRegistro.addEventListener("click", miModulo.irRegistro);
}
if (btnCrearCuenta) {
    btnCrearCuenta.addEventListener("click", registrarse.crearCuenta);
}


for (const img of imgs) {
    if (img.id == "imgLogo") {
        img.addEventListener("click", miModulo.irInicioSesion);
    } else if (img.id == "imgGrupos") {
        img.addEventListener("click", miModulo.irGrupos);
    } else if (img.id == "imgPerfil") {
        img.addEventListener("click", miModulo.irPerfil);
    } else if (img.id == "imgHome") {
        img.addEventListener("click", miModulo.irhome);
    } else if (img.id == "imgNotificaciones") { 
        img.addEventListener("click", notificaciones.toggleNotificaciones);
    } else if (img.id == "imgConfiguracion" ){
        img.addEventListener("click", configuracion.toggleConfiguracion);
    }
}


const pagina = window.location.pathname;

if (pagina.includes("principal.html")) {
    publicaciones.cargarPublicaciones();
}
else if (pagina.includes("grupos.html")) {
    cargarGrupos.cargarGrupos();
}
else if (pagina.includes("perfil.html")) {
    cargarPerfil.cargarPerfil();
}

const textBuscarGrupo = document.getElementById("txtbuscarGrupo");
if (textBuscarGrupo){
    textBuscarGrupo.addEventListener("keyup",
    function(e) {
        cargarGrupos.buscarGrupo(e.target.value);
    }
    );
}

const textBuscarPerfil = document.getElementById("txtBuscarPerfil");

if (textBuscarPerfil){
    textBuscarPerfil.addEventListener("keyup",
        (e)=>{
            buscadorPerfiles.iniciarBusquedaPrefiles(e.target.value);
        }
    )
}