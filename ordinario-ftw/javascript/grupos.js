export function cargarGrupos(){
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function (){ 
        const xmlDoc = xhttp.responseXML;

        if (!xmlDoc) {
            console.error("No se pudo leer grupos.xml");
            return;
        }
        const gruposXml = xmlDoc.getElementsByTagName("grupo");
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
        let imagenDoc = grupoActual.getElementsByTagName("imagengrupo")[0];

        let panelGrupo = document.createElement("div");
        panelGrupo.classList.add("buscar-grupo");
        panelContenedor.appendChild(panelGrupo);

        let infoTexto = document.createElement("div");
        infoTexto.classList.add("info-grupo-texto");
        panelGrupo.appendChild(infoTexto);


        if (grupoDoc){
            let grupo = document.createElement("h3");
            grupo.textContent = grupoDoc.textContent;
            panelGrupo.appendChild(grupo);
        }

        if (descripcionDoc){
            let descripcion = document.createElement("p");
            descripcion.textContent = descripcionDoc.textContent;
            panelGrupo.appendChild(descripcion);
        }
                 
        let btnUnirse = document.createElement("button");
        btnUnirse.textContent = "Unirse";
        btnUnirse.classList.add("btn-unirse-pill");
        panelGrupo.appendChild(btnUnirse);
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
            // --- FIN CABECERA ---

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

            // Barra de reacciones
            let barraAcciones = document.createElement("div");
            barraAcciones.classList.add("barra-acciones");
            panelPublicacion.appendChild(barraAcciones);

            let icons = ["meencanta.jpg", "comentarios.jpg", "compartir.jpg"];
            icons.forEach(icon => {
                let img = document.createElement("img");
                img.src = `../imagenes/${icon}`;
                img.classList.add("icon-reaccion");
                barraAcciones.appendChild(img);
            });
        }
    }
}