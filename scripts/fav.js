document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("favorites-section");
    section.classList.add("favorites");

    const titulo = document.createElement("h1");
    titulo.textContent = "FAVORITES";
    titulo.setAttribute("aria-label", "Favorite characters section");
    titulo.style.color = "#000";           
    titulo.style.textAlign = "center";     

    const contenedor = document.createElement("div");
    contenedor.className = "favorites-container";

    const personajes = [
        { src: "recursos/Mask group 1.png", alt: "Oswald Cobblepot, The Penguin", nombre: "Penguin" },
        { src: "recursos/Mask group (1) 1.png", alt: "The Joker", nombre: "Joker" },
        { src: "recursos/Alfred (Michael Caine) - Dark Knight Rises 2.png", alt: "Alfred Pennyworth", nombre: "Alfred" }
    ];

    personajes.forEach(personaje => {
        const card = document.createElement("div");
        card.className = "favorite-card";
        card.style.textAlign = "center"; 

        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = personaje.src;
        img.alt = personaje.alt;

        const caption = document.createElement("figcaption");
        caption.textContent = personaje.nombre;
        caption.style.color = "#000";       
        caption.style.marginTop = "8px";    

        figure.appendChild(img);
        figure.appendChild(caption);
        card.appendChild(figure);
        contenedor.appendChild(card);
    });

    section.appendChild(titulo);
    section.appendChild(contenedor);
});
