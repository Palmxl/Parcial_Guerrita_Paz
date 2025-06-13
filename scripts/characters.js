let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

function toggleFavorito(id) {
  if (!usuarioActivo?.favoritos) usuarioActivo.favoritos = [];

  const index = usuarioActivo.favoritos.indexOf(id);
  if (index === -1) {
    usuarioActivo.favoritos.push(id);
  } else {
    usuarioActivo.favoritos.splice(index, 1);
  }

  // Guardar cambios en usuarioActivo
  localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

  // 🔥 Actualizar también en la lista global de usuarios
  const indexUsuario = usuarios.findIndex(u => u.email === usuarioActivo.email);
  if (indexUsuario !== -1) {
    usuarios[indexUsuario].favoritos = [...usuarioActivo.favoritos];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  cargarPersonajesAPI(); // volver a renderizar
}

function cargarPersonajesAPI() {
  const API_URL = 'https://akabab.github.io/superhero-api/api/all.json';

  fetch(API_URL)
    .then(res => res.json())
    .then(data => mostrarCatalogo(data))
    .catch(error => {
      console.error('Error al conectar con el API:', error);
      document.getElementById('catalogo').innerHTML = '<p>No se pudieron cargar los personajes.</p>';
    });
}

function mostrarCatalogo(personajes) {
  const contenedor = document.getElementById('catalogo');
  contenedor.innerHTML = '';

  const personajesDC = personajes.filter(p =>
    p.biography?.publisher?.includes("DC")
  );

  personajesDC.forEach(p => {
    const esFavorito = usuarioActivo?.favoritos?.includes(p.id);
    const card = document.createElement('div');
    card.className = 'favorito-card';

    card.innerHTML = `
      <h3 class="personaje-nombre" data-id="${p.id}">${p.name}</h3>
      <img src="${p.images.md}" alt="${p.name}" class="personaje-imagen" data-id="${p.id}">
      <p><strong>Altura:</strong> ${p.appearance.height[1]}</p>
      <p><strong>Nombre real:</strong> ${p.biography.fullName}</p>
      ${
        usuarioActivo
          ? `<button onclick="toggleFavorito(${p.id})">
              ${esFavorito ? '💛 Quitar de favoritos' : '🤍 Agregar a favoritos'}
            </button>`
          : `<p><em>Inicia sesión para agregar a favoritos</em></p>`
      }
    `;

    card.querySelectorAll('.personaje-nombre, .personaje-imagen').forEach(el => {
      el.addEventListener('click', () => {
        localStorage.setItem('personajeDetalle', JSON.stringify(p));
        window.location.href = 'pages/detalle.html';
      });
    });

    contenedor.appendChild(card);
  });
}

cargarPersonajesAPI();