export function cargarPublicaciones(){
    const xhttp =new XMLHttpRequest()
    xhttp.onload = function (){ 
        const xmlDoc = xhttp.responseXML
        const usuarioxml = xmlDoc.getElementsByTagName("usuario")
        const desripcionxml = xmlDoc.getElementsByTagName("descripcion")
        const imagenexml = xmlDoc.getElementsByTagName("imagen")
    }
    xhttp.open("GET", "../xml/publicaciones.xml")
    xhttp.send()
} 

