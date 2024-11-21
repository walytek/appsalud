const esquemaVacunacion = {
    "0-2 meses": ["BCG", "Hepatitis B"],
    "2 meses": ["Pentavalente", "Polio IPV", "Neumococo", "Rotavirus"],
    "3 meses": ["Meningococo"],
    "4 meses": ["Pentavalente", "Polio IPV", "Neumococo", "Rotavirus"],
    "5 meses": ["Meningococo"],
    "6 meses": ["Pentavalente", "Polio IPV"],
    "12 meses": ["Triple Viral", "Neumococo", "Hepatitis A"],
    "15 meses": ["Varicela", "Meningococo"],
    "18 meses": ["Pentavalente", "Polio IPV", "Triple Viral"],
    "5-6 años": ["Triple Viral", "Polio refuerzo", "Triple Bacteriana"]
};

function calcularVacunas() {
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    if (!fechaNacimiento) {
        alert("Por favor, ingresa una fecha de nacimiento.");
        return;
    }

    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    const edadMeses = Math.floor((hoy - fechaNac) / (1000 * 60 * 60 * 24 * 30));

    const edadAnios = Math.floor(edadMeses / 12);
    const edadRestanteMeses = edadMeses % 12;
    document.getElementById("edad").innerText = `Edad: ${edadAnios} años y ${edadRestanteMeses} meses`;

    let vacunasEsperadas = [];
    for (const rango in esquemaVacunacion) {
        const [inicio, fin] = rango.split('-').map((v) => parseInt(v));
        if ((fin === undefined && inicio <= edadMeses) || (inicio <= edadMeses && edadMeses < fin)) {
            vacunasEsperadas = vacunasEsperadas.concat(esquemaVacunacion[rango]);
        }
    }

    const vacunasEsperadasUl = document.getElementById("vacunas-esperadas");
    vacunasEsperadasUl.innerHTML = '';
    vacunasEsperadas.forEach((vacuna) => {
        const li = document.createElement('li');
        li.textContent = vacuna;
        vacunasEsperadasUl.appendChild(li);
    });

    document.getElementById("resultado").style.display = "block";
}

function procesarImagen() {
    alert("Función de procesamiento de imagen pendiente");
}

// Registrar el service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then((registration) => console.log("ServiceWorker registrado con éxito:", registration))
            .catch((error) => console.error("Error al registrar ServiceWorker:", error));
    });
}
