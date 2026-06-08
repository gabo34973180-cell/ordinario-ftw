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
        let reacciones = postActual.getElementsByTagName("meencanta");
        let comentarios = postActual.getElementsByTagName("comentario");
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
        imgMeEncanta.addEventListener("click",
            function(){
                mostrarReacciones(reacciones);
            }
        );

        let imgComentarios = document.createElement("img");
        imgComentarios.src = "../imagenes/comentarios.jpg";
        imgComentarios.classList.add("icon-reaccion");
        barraAcciones.appendChild(imgComentarios);
        imgComentarios.addEventListener("click",
            function(){

                mostrarComentarios(comentarios);

            }
        );

    }
}

function mostrarReacciones(reacciones){

    eliminarPopup();

    let popup = document.createElement("div");
    popup.classList.add("popup-info");

    let titulo = document.createElement("h4");
    titulo.textContent = "Reacciones";
    popup.appendChild(titulo);

    let lista = document.createElement("ul");

    for(let i = 0; i < reacciones.length; i++){
        let item = document.createElement("li");
        item.textContent = reacciones[i].textContent;
        lista.appendChild(item);
    }

    popup.appendChild(lista);

    document.body.appendChild(popup);

    setTimeout(() => {
        document.addEventListener("click", cerrarAlDarClickFuera);
    }, 100);
}


function mostrarComentarios(comentarios){

    eliminarPopup();

    let popup = document.createElement("div");
    popup.classList.add("popup-info");

    let titulo = document.createElement("h4");
    titulo.textContent = "Comentarios";
    popup.appendChild(titulo);

    for(let i = 0; i < comentarios.length; i++){

        let usuario = comentarios[i].getElementsByTagName("cmtusuario")[0];

        let texto = comentarios[i].getElementsByTagName("texto")[0];

        let bloque = document.createElement("div");

        bloque.classList.add("comentario-item");

        bloque.innerHTML = `
            <strong>${usuario.textContent}</strong>
            <p>${texto.textContent}</p>
        `;

        popup.appendChild(bloque);
    }

    document.body.appendChild(popup);

    setTimeout(() => {
        document.addEventListener("click", cerrarAlDarClickFuera);
    }, 100);
}

function eliminarPopup(){

    let viejo = document.querySelector(".popup-info");

    if(viejo){
        viejo.remove();
    }
}

function cerrarAlDarClickFuera(e){

    let popup = document.querySelector(".popup-info");

    if(
        popup && !popup.contains(e.target) && !e.target.classList.contains("icon-reaccion")
    ){
        popup.remove();
        document.removeEventListener(
            "click",
            cerrarAlDarClickFuera
        );
    }
}