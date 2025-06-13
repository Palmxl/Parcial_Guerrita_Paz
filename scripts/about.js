class SeccionHistoria {
    constructor(titulo, contenido) {
        this.titulo = titulo;
        this.contenido = contenido;
    }
}

const secciones = [
    new SeccionHistoria("Gotham City", "Gotham es una metrópolis sumida en el crimen, gobernada por el miedo y la corrupción. Es el escenario donde surge el mito del murciélago."),
    new SeccionHistoria("Bruce Wayne", "Hijo de Thomas y Martha Wayne, Bruce es testigo del asesinato de sus padres a manos de un criminal. Este trauma lo impulsa a convertirse en Batman."),
    new SeccionHistoria("Los Villanos", "Desde el Joker hasta el Pingüino, Gotham está plagada de enemigos icónicos que desafían tanto la moral como la fuerza de Batman.")
];

function mostrarSinopsis() {
    const contenedor = document.getElementById("synopsis-container");

    secciones.forEach(seccion => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("sinopsis-card");

        tarjeta.innerHTML = `
            <h2>${seccion.titulo}</h2>
            <p>${seccion.contenido}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
}

window.addEventListener("DOMContentLoaded", mostrarSinopsis);