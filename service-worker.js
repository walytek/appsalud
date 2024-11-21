if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")  // La ruta debe ser la raíz del proyecto
            .then((registration) => {
                console.log("Service Worker registrado con éxito:", registration);
            })
            .catch((error) => {
                console.error("Error al registrar Service Worker:", error);
            });
    });
}
