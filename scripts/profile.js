const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const mensaje = document.getElementById('mensaje');

// Aquí mostraremos los favoritos
const favoritosContainer = document.createElement('div');
favoritosContainer.id = 'favoritosContainer';
document.querySelector('.contenedor-perfil').appendChild(favoritosContainer);

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioLogueado = JSON.parse(localStorage.getItem('logueado'));

if (!usuarioLogueado) {
  alert('Debes iniciar sesión.');
  window.location.href = 'login.html';
} else {
  const usuario = usuarios.find(u => u.email === usuarioLogueado.email);
  if (usuario) {
    // Mostrar datos del perfil
    nombreInput.value = usuario.nombre;
    emailInput.value = usuario.email;
    passwordInput.value = usuario.password;

    // Mostrar favoritos
    if (usuario.favoritos && usuario.favoritos.length > 0) {
      favoritosContainer.innerHTML = `<h2> Favoritos</h2><ul>${usuario.favoritos.map(f => `<li>${f}</li>`).join('')}</ul>`;
    } else {
      favoritosContainer.innerHTML = `<h2> Favoritos</h2><p>No tienes personajes favoritos.</p>`;
    }
  }
}

document.getElementById('perfilForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nuevoNombre = nombreInput.value;
  const nuevoEmail = emailInput.value;
  const nuevaPassword = passwordInput.value;

  const index = usuarios.findIndex(u => u.email === usuarioLogueado.email);
  if (index !== -1) {
    // Mantener los favoritos anteriores
    const favoritosPrevios = usuarios[index].favoritos || [];

    usuarios[index] = {
      nombre: nuevoNombre,
      email: nuevoEmail,
      password: nuevaPassword,
      favoritos: favoritosPrevios
    };

    // Guardar cambios en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('logueado', JSON.stringify(usuarios[index]));

    mensaje.textContent = ' Cambios guardados exitosamente.';
  }
});

function volver() {
  window.location.href = 'index.html';
}