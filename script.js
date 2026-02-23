/**
 * Boutique Maricruz - Lógica JavaScript Principal
 * Este componente asume la administración visual y control del modelo de navegación llamado SPA (Single Page Application).
 * El enfoque central de este archivo es la Didáctica Profesional. Se removieron códigos complejos, centrándonos en enrutamiento (routing) visual 
 * y animaciones simples al deslizar la vista hacia abajo. 
 */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------------------------------------------------------
    // SECCIÓN 1: LÓGICA DE NAVEGACIÓN "SPA" (Cambio de Pantallas sin Actualizar la Web)
    // ----------------------------------------------------------------------------------------------------------------------

    // Almacenamos nuestra lógica en el explorador 'window', para que nuestro HTML (onclick="window.navigateTo('inicio')") pueda invocarla.
    window.navigateTo = (identificadorDeLaSeccion) => {

        // 1. OBTENCIÓN: Recuperamos todas las etiquetas HTML (div, section, etc.) que incluyan la clase CSS '.page-section'
        const listaDeSecciones = document.querySelectorAll('.page-section');

        // 2. LIMPIEZA / OCULTAR: Iteramos sección por sección y le asignamos una clase ('hidden' de Tailwind) que los oculta ("display: none").
        listaDeSecciones.forEach(seccionHtml => {
            seccionHtml.classList.add('hidden');
        });

        // 3. ACTIVAR VISIBILIDAD: De acuerdo a qué ID llamó al evento, lo volvemos visible.
        const etiquetaObjetivo = document.getElementById(identificadorDeLaSeccion); // Ej: buscar id="coleccion"
        if (etiquetaObjetivo) {
            etiquetaObjetivo.classList.remove('hidden'); // Sacamos la clase de Tailwind de ocultar visualización

            // Un pequeño efecto de desplazamiento (scroll) suave automatizado hacia el principio de la página web al cambiar.
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Dado que las secciones pueden no haber rendido las animaciones inferiores, las cargamos.
            activarDeteccionVisualParaAnimaciones();
        }

        // 4. HISTORIAL URL: Modificamos el vínculo del navegador sin recargar toda la página.
        // Así logramos un comportamiento natural del botón de "atrás" en Chrome y Firefox.
        history.pushState(null, null, `#${identificadorDeLaSeccion}`);
    };

    // ----------------------------------------------------------------------------------------------------------------------
    // SECCIÓN 2: CONTROLADOR DE ANIMACIONES 'REVELADO' AL DESLIZAR (Scroll Observer)
    // ----------------------------------------------------------------------------------------------------------------------
    const activarDeteccionVisualParaAnimaciones = () => {
        // Objeto 'IntersectionObserver' de Javascript, que se acciona elásticamente sólo cuando algo está en pantalla (mejora rendimiento)
        const sensorDeVistas = new IntersectionObserver((entradas) => {
            entradas.forEach(ingreso => {
                // Validación Estándar: Verificar estado Intersecting. 'isIntersecting' es Verdadero si ya es parte del foco visual en pantalla de la persona.
                if (ingreso.isIntersecting) {
                    ingreso.target.classList.add('active'); // Llama el CSS transition ya previamente armado en style.css (Aparecer lentamente hacia arriba)
                }
            });
        }, { threshold: 0.1 }); // (Requerimiento de exposición: Se activa si aunque sea el 10% del recuadro ya está en vista del navegador)

        // Ubicamos todos los recuadros gráficos que requieren animación (Usan la clase '.reveal' en HTML).
        const agrupacionRecuadrosAAplicar = document.querySelectorAll('.reveal');

        // Inyectamos nuestro observador inteligente para cada elemento del ciclo For y quedan a la espera.
        agrupacionRecuadrosAAplicar.forEach(objetoVisible => sensorDeVistas.observe(objetoVisible));
    };

    // ----------------------------------------------------------------------------------------------------------------------
    // SECCIÓN 3: CONTROLADOR CENTRAL Y CARGA ASÍNCRONA (ENTRY METHOD / BOOTSTRAP)
    // ----------------------------------------------------------------------------------------------------------------------

    // Arrancamos el generador de animación.
    activarDeteccionVisualParaAnimaciones();

    // Validamos el URL web general de modo dinámico para entender cuál sector (Sección) mostrar al cargar toda la web.
    // Ejemplo: Alguien ingresa en www.maricruz.bo/#nosotros, queremos mostrar la tabulador de '#nosotros'.
    // Cortamos la letra Nro 1 para obviar el símbolo (hash): "#". 
    const hashIngresado = window.location.hash.substring(1);

    // Empleamos logicas "Ternarias" (Validación condicionada online). Si 'hashIngresado' existe va hacia ahí. Caso contrario (por defecto) va a 'inicio'.
    const accesoPuntoInicial = hashIngresado ? hashIngresado : 'inicio';

    // Explotamos y ejecutamos la función final forzando su arranque.
    window.navigateTo(accesoPuntoInicial);

});
