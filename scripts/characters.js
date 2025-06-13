let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

const personajes = [
  {
    id: 1,
    nombre: "Batman",
    descripcion: "El Caballero de la Noche, protector de Gotham.",
    imagen: "recursos/batman.jpeg"
  },  
  {
    id: 2,
    nombre: "Joker",
    descripcion: "El archienemigo de Batman, símbolo del caos.",
    imagen: "recursos/joker.png"
  },
  {
    id: 3,
    nombre: "Robin",
    descripcion: "El fiel compañero de Batman en su lucha contra el crimen.",
    imagen: "recursos/robin.jpeg"
  },
  {
    id: 4,
    nombre: "Catwoman",
    descripcion: "Una ladrona experta con una relación complicada con Batman.",
    imagen: "recursos/gatubela.jpeg"
  },
  {
    id: 5,
    nombre: "Two-Face",
  descripcion: "Antiguo fiscal, convertido en villano tras un accidente que desfiguró la mitad de su rostro.",
  imagen: "recursos/two-face.jpeg"
  },
  {
    id: 6,
    nombre: "The Riddler",
    descripcion: "Criminal obsesionado con los acertijos y juegos mentales.",
    imagen: "recursos/riddle.jpeg"
  },
  {
    id: 7,
    nombre: "Ra's al Ghul",
    descripcion: "Líder inmortal de la Liga de las Sombras.",
    imagen: "recursos/ra's al ghul.jpeg"
  },
  {
    id: 8,
    nombre: "Penguin",
    descripcion: "Un mafioso de Gotham conocido por su paraguas-truco.",
    imagen: "recursos/The Penguin.jpeg"
  },
  {
    id: 9,
    nombre: "Lucius Fox",
    descripcion: "Genio tecnológico que ayuda a Batman con sus gadgets.",
    imagen: "recursos/lucius fox.jpeg"
  },
  {
    id: 10,
    nombre: "Scarecrow",
  descripcion: "Un psicólogo que usa toxinas del miedo.",
  imagen: "recursos/Scarecrow_.jpeg"
  }
];

function toggleFavorito(id) {
  if (!usuarioActivo?.favoritos) {
    usuarioActivo.favoritos = [];
  }

  const index = usuarioActivo.favoritos.indexOf(id);
  if (index === -1) {
    usuarioActivo.favoritos.push(id);
  } else {
    usuarioActivo.favoritos.splice(index, 1);
  }

  localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
  renderizarPersonajes();
}

function renderizarPersonajes() {
  const contenedor = document.getElementById("personajesContainer");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  personajes.forEach(personaje => {
    const esFavorito = usuarioActivo?.favoritos?.includes(personaje.id);

    const card = document.createElement("div");
    card.classList.add("favorito-card");

    // Contenido de la tarjeta
    card.innerHTML = `
      <h3 class="personaje-nombre" data-id="${personaje.id}">${personaje.nombre}</h3>
      <img src="${personaje.imagen}" alt="${personaje.nombre}" style="max-width:100px;" class="personaje-imagen" data-id="${personaje.id}">
      <p>${personaje.descripcion}</p>
      ${
        usuarioActivo
          ? `<button onclick="toggleFavorito(${personaje.id})">
              ${esFavorito ? '💛 Quitar de favoritos' : '🤍 Agregar a favoritos'}
            </button>`
          : `<p><em>Inicia sesión para agregar a favoritos</em></p>`
      }
    `;

    // Evento para ir al detalle
    card.querySelectorAll('.personaje-nombre, .personaje-imagen').forEach(el => {
      el.addEventListener('click', () => {
        localStorage.setItem('personajeDetalle', JSON.stringify(personaje));
        window.location.href = 'detalle.html';
      });
    });

    contenedor.appendChild(card);
  });

  function cargarPersonajesAPI() {
  const API_URL = 'https://batman-api.fly.dev/api/v1/characters';
  fetch(API_URL)
    .then(res => res.json())
    .then(data => mostrarCatalogo(data))
    .catch(error => console.error('Error al conectar con el API:', error));
}

function mostrarCatalogo(personajes) {
  const contenedor = document.getElementById('catalogo');
  contenedor.innerHTML = '';

  personajes.forEach(p => {
    const card = document.createElement('div');
    card.className = 'personaje';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><strong>Ocupación:</strong> ${p.occupation}</p>
      <p><strong>Altura:</strong> ${p.height}</p>
    `;
    contenedor.appendChild(card);
  });
}

}

renderizarPersonajes();
cargarPersonajesAPI();