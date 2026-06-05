export function crearCuenta() {
    const matricula = document.getElementById("txtMatriculaReg").value;
    const nombre = document.getElementById("txtNombreReg").value;
    const pass = document.getElementById("txtPasswordReg").value;

    if (matricula && nombre && pass) {
        localStorage.setItem("usuarioLogueado", nombre);

        window.location.href = "principal.html";
    } else {
        alert("Por favor llena todos los campos");
    }
}