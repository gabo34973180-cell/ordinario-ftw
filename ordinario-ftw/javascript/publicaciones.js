export function cargarPublicaciones(){
    const xhttp = new XMLHttpRequest()
    xhttp.onload = function (){ 
        const xmlDoc = xhttp.responseXML
        const publicacionesXml = xmlDoc.getElementsByTagName("publicacion")
        cargarPublicacionesPanel(publicacionesXml)
    }
    xhttp.open("GET", "../xml/publicaciones.xml")
    xhttp.send()
} 

function cargarPublicacionesPanel(publicacionesXml){
    const panelContenedor = document.getElementById("publicaciones");
    if (!panelContenedor) return;

    for (let i = 0; i < publicacionesXml.length; i++){
        let postActual = publicacionesXml[i];

        let usuarioDoc = postActual.getElementsByTagName("usuario")[0];
        let descripcionDoc = postActual.getElementsByTagName("descripcion")[0];
        let imagenDoc = postActual.getElementsByTagName("imagen")[0]; 

        let panelPublicacion = document.createElement("div")
        panelPublicacion.classList.add("panel-publicacion")
        panelContenedor.appendChild(panelPublicacion) 

        if (usuarioDoc) {
            let usuario = document.createElement("h3")
            usuario.textContent = usuarioDoc.textContent
            panelPublicacion.appendChild(usuario)
        }
        if (descripcionDoc) {
            let descripcion = document.createElement("p")
            descripcion.textContent = descripcionDoc.textContent
            panelPublicacion.appendChild(descripcion)
        }
        if (imagenDoc && imagenDoc.textContent.trim() !== "") {
            let imagen = document.createElement("img")
            imagen.src = imagenDoc.textContent
            panelPublicacion.appendChild(imagen)
        }

        let barraAcciones = document.createElement("div");
        barraAcciones.classList.add("barra-acciones");
        panelPublicacion.appendChild(barraAcciones);

        let imgMeEncanta = document.createElement("img");
        imgMeEncanta.src = "../imagenes/meencanta.jpg";
        imgMeEncanta.classList.add("icon-reaccion");
        barraAcciones.appendChild(imgMeEncanta);

        let imgComentarios = document.createElement("img");
        imgComentarios.src = "../imagenes/comentarios.jpg";
        imgComentarios.classList.add("icon-reaccion");
        barraAcciones.appendChild(imgComentarios);


        let imgCompartir = document.createElement("img");
        imgCompartir.src = "../imagenes/compartir.jpg";
        imgCompartir.classList.add("icon-reaccion");
        barraAcciones.appendChild(imgCompartir);
        
    }
}