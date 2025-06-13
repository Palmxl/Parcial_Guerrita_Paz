// Obtener personaje del localStorage
const personaje = JSON.parse(localStorage.getItem("personajeDetalle"));

// Referencia al contenedor
const container = document.getElementById("detalle-personaje");

if (personaje) {
  container.innerHTML = `
    <section class="personaje-detalle">
      <img src="${personaje.imagen}" alt="${personaje.nombre}">
      <div class="personaje-info">
        <h1>${personaje.nombre}</h1>
        <p>${personaje.descripcion || "No hay descripción disponible."}</p>
        <a href="characters.html" class="volver-btn">← Volver a personajes</a>
      </div>
    </section>
  `;
} else {
  container.innerHTML = "<p style='color: red;'>Personaje no encontrado.</p>";
}
