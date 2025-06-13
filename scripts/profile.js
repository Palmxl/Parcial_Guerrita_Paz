const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const mensaje = document.getElementById('mensaje');

// Crear contenedor para favoritos
const favoritosContainer = document.createElement('div');
favoritosContainer.id = 'favoritosContainer';
document.querySelector('.contenedor-perfil').appendChild(favoritosContainer);

// Obtener usuarios y sesión
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioLogueado = JSON.parse(localStorage.getItem('usuarioActivo'));

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

    // Mostrar favoritos desde la API
    if (usuario.favoritos && usuario.favoritos.length > 0) {
      fetch("https://akabab.github.io/superhero-api/api/all.json")
        .then(res => res.json())
        .then(data => {
          const favoritos = data.filter(p => usuario.favoritos.includes(p.id));

          if (favoritos.length === 0) {
            favoritosContainer.innerHTML = `<h2>Favoritos</h2><p>No se encontraron personajes.</p>`;
            return;
          }

          const html = favoritos.map(p => `
            <div class="favorito-card">
              <h3>${p.name}</h3>
              <img src="${p.images.md}" alt="${p.name}" style="width:100px;">
              <p><strong>Altura:</strong> ${p.appearance.height[1]}</p>
              <p><strong>Nombre real:</strong> ${p.biography.fullName}</p>
            </div>
          `).join('');

          favoritosContainer.innerHTML = `<h2>Favoritos</h2><div class="favoritos-lista">${html}</div>`;
        })
        .catch(error => {
          console.error("Error al cargar personajes favoritos:", error);
          favoritosContainer.innerHTML = `<h2>Favoritos</h2><p>Error al cargar personajes.</p>`;
        });
    } else {
      favoritosContainer.innerHTML = `<h2>Favoritos</h2><p>No tienes personajes favoritos.</p>`;
    }
  }
}

// Guardar cambios del perfil
document.getElementById('perfilForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nuevoNombre = nombreInput.value;
  const nuevoEmail = emailInput.value;
  const nuevaPassword = passwordInput.value;

  const index = usuarios.findIndex(u => u.email === usuarioLogueado.email);
  if (index !== -1) {
    // Mantener favoritos anteriores
    const favoritosPrevios = usuarios[index].favoritos || [];

    usuarios[index] = {
      nombre: nuevoNombre,
      email: nuevoEmail,
      password: nuevaPassword,
      favoritos: favoritosPrevios
    };

    // Actualizar localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarios[index]));
    localStorage.setItem('logueado', JSON.stringify({
      nombreCompleto: nuevoNombre,
      email: nuevoEmail
    }));

    mensaje.textContent = 'Cambios guardados exitosamente.';
  }
});

// Botón volver
function volver() {
  window.location.href = 'index.html';
}