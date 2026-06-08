import { cerrarSesion } from "./validar.js";

if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("dark-mode");
}



function crearPanelConfiguracion() {
    let panel = document.getElementById("panel-configuracion");

    if (!panel) {
        panel = document.createElement("aside");
        panel.id = "panel-configuracion";
        panel.classList.add("ventana-configuracion");
        panel.innerHTML = `
            <div class = "configuracion-header">
                <h3>Configuracion</h3>
            </div>

            <div class="config-item">
                <span>Modo Oscuro</span>

                <label class="switch">
                    <input type="checkbox" id="togle-modo-oscuro">
                    <span class="slider"></span>
                </label>
            </div>

            <div class="config-item">
                <span>Cerrar Sesion</span>
                <button id="btnCerrarSesion"> Salir</button>
            </div>
        `;
        document.body.appendChild(panel);
        const btnCerrar = panel.querySelector("#btnCerrarSesion");
        btnCerrar.addEventListener("click", cerrarSesion);

        const darkMode = panel.querySelector("#togle-modo-oscuro");
        
        if (localStorage.getItem("modoOscuro") === "true") {
            darkMode.checked = true;
        }

        darkMode.addEventListener("change", activarModoOscuro);
    }
    return panel;

}

export function toggleConfiguracion(){
    const panel = crearPanelConfiguracion();
    if(panel.style.display === "block"){
        panel.style.display = "none";
    
    }else{
        panel.style.display = "block";
    }
}

function activarModoOscuro() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("modoOscuro", document.body.classList.contains("dark-mode"));
}


