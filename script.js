// Esquema de vacunación (en meses)
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

// Función para calcular las vacunas esperadas según la fecha de nacimiento
function calcularVacunas() {
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    if (!fechaNacimiento) {
        alert("Por favor, ingresa una fecha de nacimiento.");
        return;
    }

    // Calcular edad en meses
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    const edadMeses = Math.floor((hoy - fechaNac) / (1000 * 60 * 60 * 24 * 30));

    // Mostrar la edad
    const edadAnios = Math.floor(edadMeses / 12);
    const edadRestanteMeses = edadMeses % 12;
    document.getElementById("edad").innerText = `Edad: ${edadAnios} años y ${edadRestanteMeses} meses`;

    // Calcular vacunas esperadas
    let vacunasEsperadas = [];
    for (const rango in esquemaVacunacion) {
        const [inicio, fin] = rango.split('-').map((v) => parseInt(v));
        if ((fin === undefined && inicio <= edadMeses) || (inicio <= edadMeses && edadMeses < fin)) {
            vacunasEsperadas = vacunasEsperadas.concat(esquemaVacunacion[rango]);
        }
    }

    // Mostrar vacunas esperadas
    const vacunasEsperadasUl = document.getElementById("vacunas-esperadas");
    vacunasEsperadasUl.innerHTML = '';
    vacunasEsperadas.forEach((vacuna) => {
        const li = document.createElement('li');
        li.textContent = vacuna;
        vacunasEsperadasUl.appendChild(li);
    });

    // Mostrar las vacunas faltantes (en este caso, no se pueden comparar, pero lo puedes dejar vacío)
    const vacunasFaltantesUl = document.getElementById("vacunas-faltantes");
    vacunasFaltantesUl.innerHTML = ''; // Si tienes un método para compararlas con un carnet, lo puedes añadir aquí.

    // Mostrar el contenedor de resultados
    document.getElementById("resultado").style.display = "block";
}
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("vacunacion-cache").then((cache) => {
            return cache.addAll([
                "./",              // Página de inicio
                "./index.html",     // Página principal
                "./style.css",      // Estilos CSS
                "./script.js",      // Lógica JavaScript
                "./manifest.json",  // Manifesto
                "./icon-192.png",   // Icono de la app
                "./icon-512.png",   // Icono de la app
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
