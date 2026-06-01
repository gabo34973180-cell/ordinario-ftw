// Esta función crea el contenedor flotante en el HTML actual si no existe
function crearContenedorNotificaciones() {
    let panel = document.getElementById("panel-notificaciones");
    
    if (!panel) {
        panel = document.createElement("aside");
        panel.id = "panel-notificaciones";
        panel.classList.add("ventana-notificaciones");
        
        panel.innerHTML = `
            <div class="notificaciones-header">
                <img src="../imagenes/notificaciones.jpg" class="icon-noti-header"> Notificaciones
            </div>
            <div id="lista-notificaciones"></div>
        `;
        // Lo inyectamos directo al body de la página actual
        document.body.appendChild(panel);
    }
    return panel;
}

export function toggleNotificaciones() {
    const panel = crearContenedorNotificaciones();
    
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
        cargarDatosNotificaciones();
    }
}

function cargarDatosNotificaciones() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const xmlDoc = xhttp.responseXML;
        if (!xmlDoc) return;
        const lista = xmlDoc.getElementsByTagName("notificacion");
        renderizarNotificaciones(lista);
    };
    xhttp.open("GET", "../xml/notificaciones.xml");
    xhttp.send();
}

function renderizarNotificaciones(xmlNotificaciones) {
    const contenedor = document.getElementById("lista-notificaciones");
    if (!contenedor) return;
    contenedor.innerHTML = ""; 

    for (let i = 0; i < xmlNotificaciones.length; i++) {
        let user = xmlNotificaciones[i].getElementsByTagName("usuario")[0].textContent;
        let tipo = xmlNotificaciones[i].getElementsByTagName("tipo")[0].textContent;
        
        let accion = "";
        if (tipo === "Me Encanta") accion = "reaccionó a tu publicación";
        else if (tipo === "Comentario") accion = "comentó tu foto";
        else if (tipo === "Nuevo Seguidor") accion = "empezó a seguirte";

        let item = document.createElement("article");
        item.classList.add("item-notificacion");
        item.innerHTML = `
            <p><strong>${user}</strong> ${accion}</p>
        `;
        contenedor.appendChild(item);
    }
}