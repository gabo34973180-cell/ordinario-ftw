let gruposGuardados = [];
export function cargarGrupos(){
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function (){ 
        const xmlDoc = xhttp.responseXML;

        if (!xmlDoc) {
            console.error("No se pudo leer grupos.xml");
            return;
        }
        const gruposXml = xmlDoc.getElementsByTagName("grupo");
        gruposGuardados = [...gruposXml];
        cargarGruposPanelBuscar(gruposXml);
        cargarGruposPanelpublicaciones(gruposXml);
    };

    xhttp.open("GET", "../xml/grupos.xml");
    xhttp.send();
}

function cargarGruposPanelBuscar(gruposXml){
    const panelContenedor = document.getElementById("grupos");

    if (!panelContenedor) return;

    panelContenedor.innerHTML = "";

    for (let i = 0; i < gruposXml.length; i++){

        let grupoActual = gruposXml[i];

        let grupoDoc = grupoActual.getElementsByTagName("nombre")[0];
        let descripcionDoc = grupoActual.getElementsByTagName("descripcion")[0];
        let panelGrupo = document.createElement("div");
        panelGrupo.classList.add("buscar-grupo");
        panelContenedor.appendChild(panelGrupo);

        let infoTexto = document.createElement("div");
        infoTexto.classList.add("info-grupo-texto");
        panelGrupo.appendChild(infoTexto);


        if (grupoDoc){
            let grupo = document.createElement("h3");
            grupo.textContent = grupoDoc.textContent;
            infoTexto.appendChild(grupo);
        }

        if (descripcionDoc){
            let descripcion = document.createElement("p");
            descripcion.textContent = descripcionDoc.textContent;
            infoTexto.appendChild(descripcion);
        }
                 
        let btnVer = document.createElement("button");
        btnVer.textContent = "Ver";
        btnVer.classList.add("btn-unirse-pill");

        btnVer.addEventListener("click", () => {

            const nombreGrupo =
                grupoDoc.textContent;

            mostrarPublicacionesGrupo(nombreGrupo);
        });

        panelGrupo.appendChild(btnVer);
    }
}

function cargarGruposPanelpublicaciones(gruposXml){
    const panelContenedor = document.getElementById("publicaciones");
    if (!panelContenedor) return;
    panelContenedor.innerHTML = "";

    for (let i = 0; i < gruposXml.length; i++){
        let grupoActual = gruposXml[i];
        let grupoDoc = grupoActual.getElementsByTagName("nombre")[0];
        let imagenDocG = grupoActual.getElementsByTagName("imagengrupo")[0];
        let publicaciones = grupoActual.getElementsByTagName("publicacion");

        for (let j = 0; j < publicaciones.length; j++){

            let publicacionActual = publicaciones[j];
            let usuarioDoc = publicacionActual.getElementsByTagName("usuario")[0];
            let contenidoDoc = publicacionActual.getElementsByTagName("contenido")[0];
            let imagenDoc = publicacionActual.getElementsByTagName("imagen-pg")[0]; 
            let reacciones = publicacionActual.getElementsByTagName("meencanta");
            let comentarios = publicacionActual.getElementsByTagName("comentario");
            let panelPublicacion = document.createElement("div");
            panelPublicacion.classList.add("panel-publicacion");
            panelContenedor.appendChild(panelPublicacion);


            let headerPost = document.createElement("div");
            headerPost.classList.add("header-post");
            panelPublicacion.appendChild(headerPost);

            if (imagenDocG && imagenDocG.textContent.trim() !== ""){
                let imagenLogo = document.createElement("img");
                imagenLogo.src = imagenDocG.textContent;
                imagenLogo.classList.add("logo-grupo-post");
                headerPost.appendChild(imagenLogo);
            }

            let infoNombres = document.createElement("div");
            infoNombres.classList.add("info-nombres");
            headerPost.appendChild(infoNombres);

            if (grupoDoc){
                let grupo = document.createElement("h3");
                grupo.textContent = grupoDoc.textContent;
                infoNombres.appendChild(grupo);
            }

            if (usuarioDoc){
                let usuario = document.createElement("h4");
                usuario.textContent = usuarioDoc.textContent;
                infoNombres.appendChild(usuario);
            }


            if (contenidoDoc){
                let contenido = document.createElement("p");
                contenido.textContent = contenidoDoc.textContent;
                panelPublicacion.appendChild(contenido);
            }

            if (imagenDoc && imagenDoc.textContent.trim() !== ""){
                let imagen = document.createElement("img");
                imagen.src = imagenDoc.textContent;
                imagen.classList.add("img-principal-post");
                panelPublicacion.appendChild(imagen);
            }

            let barraAcciones = document.createElement("div");
            barraAcciones.classList.add("barra-acciones");
            panelPublicacion.appendChild(barraAcciones);

            let imgMeEncanta = document.createElement("img");
            imgMeEncanta.src = "../imagenes/meencanta.jpg";
            imgMeEncanta.classList.add("icon-reaccion");
            barraAcciones.appendChild(imgMeEncanta);

            imgMeEncanta.addEventListener(
                "click",
                function(){
                    mostrarReacciones(reacciones);
                }
            );

            let imgComentarios = document.createElement("img");
            imgComentarios.src = "../imagenes/comentarios.jpg";
            imgComentarios.classList.add("icon-reaccion");
            barraAcciones.appendChild(imgComentarios);

            imgComentarios.addEventListener(
                "click",
                function(){
                    mostrarComentarios(comentarios);
                }
            );

        }
    }
}

export function buscarGrupo(texto){
    texto = texto.toLowerCase();
    const gruposFiltrados = gruposGuardados.filter(
        grupo =>{
            const nombreGrupo = grupo.getElementsByTagName("nombre")[0].textContent.toLowerCase();
            return nombreGrupo.includes(texto);
        }
    );

    cargarGruposPanelBuscar(gruposFiltrados);
  
        
}   

export function mostrarPublicacionesGrupo(grupoSeleccionado){

    const gruposFiltrados = gruposGuardados.filter(
        grupo => {

            const nombreGrupo = grupo.getElementsByTagName("nombre")[0].textContent;
            return nombreGrupo === grupoSeleccionado;
        }
    );

    cargarGruposPanelpublicaciones(gruposFiltrados);
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
        document.addEventListener(
            "click",
            cerrarAlDarClickFuera
        );
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

        let usuario =
            comentarios[i]
            .getElementsByTagName("cmtusuario")[0];

        let texto =
            comentarios[i]
            .getElementsByTagName("texto")[0];

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
        document.addEventListener(
            "click",
            cerrarAlDarClickFuera
        );
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
        popup &&
        !popup.contains(e.target) &&
        !e.target.classList.contains("icon-reaccion")
    ){

        popup.remove();

        document.removeEventListener(
            "click",
            cerrarAlDarClickFuera
        );
    }
}