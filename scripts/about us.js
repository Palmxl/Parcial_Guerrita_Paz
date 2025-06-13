window.addEventListener("DOMContentLoaded", () => {

    class TeamMember {
        constructor(nombre, rol, imagen) {
            this.nombre = nombre;
            this.rol = rol;
            this.imagen = imagen;
        }
    }

    
    const equipo = [
        new TeamMember("Gabriela Cocuy", "Diseñadora UX/UI", "recursos/gabriela.png"),
        new TeamMember("Juan Jose Guerra", "Desarrollador Frontend", "recursos/juan.png")
    ];

    function mostrarEquipo() {
        const contenedor = document.getElementById("equipo-container");

        if (!contenedor) {
            console.error("No se encontró el contenedor con id 'equipo-container'");
            return;
        }

        equipo.forEach(miembro => {
            const card = document.createElement("div");
            card.classList.add("story-card");

            card.innerHTML = `
                <img src="${miembro.imagen}" alt="${miembro.nombre}">
                <h3>${miembro.nombre}</h3>
                <p>${miembro.rol}</p>
            `;

            contenedor.appendChild(card);
        });
    }

        mostrarEquipo();
    });