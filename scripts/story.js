class Acto {
    constructor(id, titulo, nombre, imagen) {
        this.id = id;
        this.titulo = titulo;
        this.nombre = nombre;
        this.imagen = imagen;
    }
}

const actos = [
    new Acto(1, "Acto 1", "Inicios", "recursos/guason-joker_3840x2160_xtrafondos.com.png"),
    new Acto(2, "Acto 2", "Recuerdos", "recursos/joker-y-batman_5120x2880_xtrafondos.com.png"),
    new Acto(3, "Acto 3", "Venganza", "recursos/batman-2022_5120x2880_xtrafondos.com.png")
];

function mostrarActos() {
    const contenedor = document.getElementById("story-container");

    if (!contenedor) {
        console.error("No se encontró el contenedor con id 'story-container'");
        return;
    }

    actos.forEach(acto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("story-card");

        tarjeta.innerHTML = `
            <img src="${acto.imagen}" alt="${acto.nombre}">
            <p>${acto.titulo}</p>
            <h2>${acto.nombre}</h2>
        `;

        contenedor.appendChild(tarjeta);
    });
}

window.addEventListener("DOMContentLoaded", mostrarActos);
