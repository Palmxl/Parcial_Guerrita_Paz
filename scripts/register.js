const registroForm = document.getElementById("registroForm");

function registrarUsuario(e){
    e.preventDefault()
    const nombreValor = document.getElementById("nombre").value
    const apellidoValor = document.getElementById("apellido").value
    const emailValor = document.getElementById("email").value
    const passwordValor = document.getElementById("password").value

    const usuarios =JSON.parse(localStorage.getItem("usuarios")) || []
    const existeUsuario = usuarios.some(usuario => usuario.email === emailValor)
    if(existeUsuario){
        alert("El usuario ya está registrado")
        registroForm.reset()
        return
    }
   
        const usuario = {
            nombre: nombreValor,
            apellido: apellidoValor,
            email: emailValor,
            password: passwordValor
        }
    usuarios.push(usuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    alert("Usuario registrado con éxito")
    window.location.href = "pages/login.html"

    alert("Registrar el usuario")
}
registroForm.addEventListener("submit", registrarUsuario)