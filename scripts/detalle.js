// Obtener personaje del localStorage
const personaje = JSON.parse(localStorage.getItem("personajeDetalle"));

// Referencia al contenedor
const container = document.getElementById("detalle-personaje");

if (personaje) {
  container.innerHTML = `
    <section class="personaje-detalle">
      <img src="${personaje.images?.md}" alt="${personaje.name}">
      <div class="personaje-info">
        <h1>${personaje.name}</h1>
        <p><strong>Nombre real:</strong> ${personaje.biography?.fullName || 'No disponible'}</p>
        <p><strong>Altura:</strong> ${personaje.appearance?.height?.[1] || 'No disponible'}</p>
        <p><strong>Editorial:</strong> ${personaje.biography?.publisher || 'No disponible'}</p>
        <a href="characters.html" class="volver-btn">← Volver a personajes</a>
      </div>
    </section>
  `;
} else {
  container.innerHTML = "<p style='color: red;'>Personaje no encontrado.</p>";
}