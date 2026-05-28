import * as miModulo from "./validar.js";
const btnIniciarSesion = document.getElementById("btnIniciarSesion")


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
    }
}

