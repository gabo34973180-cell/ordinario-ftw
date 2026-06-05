const usuarioActivo = localStorage.getItem("usuarioLogueado");
export function cargarPerfil(){
    cargarPerfilUsuario();
    cargarPublicacionesPerfil();
    cargarGrupos();
}

function cargarPerfilUsuario(){

    const usuarioActivo = localStorage.getItem("usuarioLogueado");

    if (!usuarioActivo){
        console.error("No hay usuario logueado");
        return;
    }

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function (){

        const xmlDoc = xhttp.responseXML;

        if (!xmlDoc){
            console.error("No se pudo leer usuarios.xml");
            return;
        }

        const usuariosXml = xmlDoc.getElementsByTagName("usuario");

        if (usuariosXml.length === 0){
            console.error("No se encontraron usuarios");
            return;
        }

        for (let i = 0; i < usuariosXml.length; i++){

            let nombreXml = 
                usuariosXml[i]
                .getElementsByTagName("nombre")[0]
                ?.textContent;

            if (nombreXml === usuarioActivo){

                cargarPerfilPanel(usuariosXml[i]);
                return;
            }
        }

        console.error("No se encontró el usuario logueado en el XML");
    }

    xhttp.open("GET", "../xml/usuarios.xml");
    xhttp.send();
}

function cargarPerfilPanel(usuarioXml) {
    const panelPerfil = document.getElementById("perfil");
    if (!panelPerfil) return;

    panelPerfil.innerHTML = "";

  
    let nombre = usuarioXml.getElementsByTagName("nombre")[0]?.textContent || "Usuario";
    let fotoPerfil = usuarioXml.getElementsByTagName("imagen")[0]?.textContent || "../imagenes/perfil.png";
    let fotoPortada = usuarioXml.getElementsByTagName("portada")[0]?.textContent || "../imagenes/juanportada.jpg";
    let seguidores = usuarioXml.getElementsByTagName("seguidor").length;
    let siguiendo = usuarioXml.getElementsByTagName("seguido").length;


    let divPortada = document.createElement("div");
    divPortada.classList.add("perfil-portada");
    let imgPortada = document.createElement("img");
    imgPortada.src = fotoPortada;
    divPortada.appendChild(imgPortada);
    panelPerfil.appendChild(divPortada);


    let divInfoHorizontal = document.createElement("div");
    divInfoHorizontal.classList.add("perfil-info-horizontal");
    panelPerfil.appendChild(divInfoHorizontal);


    let imgPerfil = document.createElement("img");
    imgPerfil.src = fotoPerfil;
    imgPerfil.classList.add("perfil-avatar-principal");
    divInfoHorizontal.appendChild(imgPerfil);


    let divDetalles = document.createElement("div");
    divDetalles.classList.add("perfil-detalles");
    divInfoHorizontal.appendChild(divDetalles);

    let txtNombre = document.createElement("h2");
    txtNombre.textContent = nombre;
    divDetalles.appendChild(txtNombre);

    let divMetricas = document.createElement("div");
    divMetricas.classList.add("perfil-metricas");
    divMetricas.innerHTML = `
        <span><strong>Seguidores:</strong> ${seguidores}</span>
        <span><strong>Siguiendo:</strong> ${siguiendo}</span>
    `;
    divDetalles.appendChild(divMetricas);
}

function cargarPublicacionesPerfil(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        const xmlDoc = xhttp.responseXML;
        if (!xmlDoc) {
            console.error("No se pudo leer publicaciones.xml");
            return;
        }
        const publicacionesXml = xmlDoc.getElementsByTagName("publicacion");
        if (publicacionesXml.length === 0) {
            console.error("No se encontraron publicaciones en el XML");
            return;
        }
        cargarPublicacionesPanel(publicacionesXml);
    }
    xhttp.open("GET", "../xml/publicaciones.xml");
    xhttp.send();
}
 
function cargarPublicacionesPanel(publicacionesXml) {

    const panelContenedor = document.getElementById("publicaciones");

    if (!panelContenedor) return;

    panelContenedor.innerHTML = "";

    const usuarioActivo = localStorage.getItem("usuarioLogueado");

    for (let i = 0; i < publicacionesXml.length; i++) {

        let pubActual = publicacionesXml[i];

        let usuarioPub =
            pubActual.getElementsByTagName("usuario")[0]
            ?.textContent;

        if (usuarioPub === usuarioActivo) {

            let descripcionPub =
                pubActual.getElementsByTagName("descripcion")[0]
                ?.textContent;

            let imagenPub =
                pubActual.getElementsByTagName("imagen")[0]
                ?.textContent;

            let panelPost = document.createElement("div");
            panelPost.classList.add("panel-publicacion");
            panelContenedor.appendChild(panelPost);

            let headerPost = document.createElement("div");
            headerPost.classList.add("header-post");
            panelPost.appendChild(headerPost);

            let txtUsuario = document.createElement("h3");
            txtUsuario.textContent = usuarioPub;
            headerPost.appendChild(txtUsuario);

            if (descripcionPub) {
                let texto = document.createElement("p");
                texto.textContent = descripcionPub;
                panelPost.appendChild(texto);
            }

            if (imagenPub && imagenPub.trim() !== "") {
                let imgMedia = document.createElement("img");
                imgMedia.src = imagenPub;
                imgMedia.classList.add("img-principal-post");
                panelPost.appendChild(imgMedia);
            }
            
            let barraAcciones = document.createElement("div");
            barraAcciones.classList.add("barra-acciones");
            panelPost.appendChild(barraAcciones);

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
}
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
                 
        let btnUnirse = document.createElement("button");
        btnUnirse.textContent = "Unirse";
        btnUnirse.classList.add("btn-unirse-pill");
        panelGrupo.appendChild(btnUnirse);
    }
}