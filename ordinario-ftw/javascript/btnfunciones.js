import * as miModulo from "./validar.js";
import * as publicaciones from "./publicaciones.js";
import * as cargarGrupos from "./grupos.js";
import * as cargarPerfil from "./perfil.js";
import * as notificaciones from "./notificaciones.js";

const btnIniciarSesion = document.getElementById("btnIniciarSesion")
const contenedorPublicaciones = document.getElementById("publicaciones");
const contenedorGrupos = document.getElementById("grupos");
const contenerdorPerfil = document.getElementById("perfil");

let imgs = document.getElementsByClassName("imgs")



if (btnIniciarSesion) {
    btnIniciarSesion.addEventListener("click", miModulo.cargar);
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
    } else if (img.id == "imgNotificaciones") { // 👈 2. ASIGNAR EL EVENTO A LA CAMPANA
        img.addEventListener("click", notificaciones.toggleNotificaciones);
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
}else if(img.id == "imgNotificaciones"){
    img.addEventListener("click", notificaciones.toggleNotificaciones);
}