const loginForm = document.getElementById("loginForm")

function ingresarUsuario(e){
    e.preventDefault()
    const emailValor = document.getElementById("email").value
    const passwordValor = document.getElementById("password").value

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    const existeUsuario = usuarios.find(usuario => usuario.email === emailValor)

    if(!existeUsuario){
        alert("El usuario no existe, por favor registralo")
        loginForm.reset()
        return
    }

    if(existeUsuario.password !== passwordValor){
        alert("Contraseña incorrecta")
        loginForm.reset()
        return
    }
    
    const usuarioLogueado = {
        nombreCompleto: existeUsuario.nombre + " " + existeUsuario.apellido,
        email: existeUsuario.email,
    }

    localStorage.setItem("logueado", JSON.stringify(usuarioLogueado))
    window.location.href = "profile.html";
}
loginForm.addEventListener("submit", ingresarUsuario);

