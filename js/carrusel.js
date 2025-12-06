// Carrusel de Personajes
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const carruselTrack = document.querySelector('.carrusel-track');
    const slides = document.querySelectorAll('.carrusel-slide');
    const prevBtn = document.querySelector('.carrusel-prev');
    const nextBtn = document.querySelector('.carrusel-next');
    const indicadores = document.querySelectorAll('.indicador');
    const modal = document.getElementById('personajeModal');
    const modalImagen = document.getElementById('modalImagen');
    const modalNombre = document.getElementById('modalNombre');
    const modalRol = document.getElementById('modalRol');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalCerrar = document.querySelector('.modal-cerrar');
    
    let slideActual = 0;
    const totalSlides = slides.length;
    
    // Función para actualizar carrusel
    function actualizarCarrusel() {
        carruselTrack.style.transform = `translateX(-${slideActual * 100}%)`;
        
        // Actualizar indicadores
        indicadores.forEach((ind, index) => {
            ind.classList.toggle('activo', index === slideActual);
        });
    }
    
    // Evento botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            slideActual = (slideActual + 1) % totalSlides;
            actualizarCarrusel();
        });
    }
    
    // Evento botón anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            slideActual = (slideActual - 1 + totalSlides) % totalSlides;
            actualizarCarrusel();
        });
    }
    
    // Evento indicadores
    indicadores.forEach(ind => {
        ind.addEventListener('click', function() {
            slideActual = parseInt(this.getAttribute('data-slide'));
            actualizarCarrusel();
        });
    });
    
    // Auto-slide cada 5 segundos
    let autoSlide = setInterval(() => {
        slideActual = (slideActual + 1) % totalSlides;
        actualizarCarrusel();
    }, 5000);
    
    // Pausar auto-slide al interactuar
    const carruselContainer = document.querySelector('.carrusel-container');
    if (carruselContainer) {
        carruselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        carruselContainer.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                slideActual = (slideActual + 1) % totalSlides;
                actualizarCarrusel();
            }, 5000);
        });
    }
    
    // Eventos para las fotos de personajes
    document.querySelectorAll('.personaje-foto').forEach(foto => {
        foto.addEventListener('click', function() {
            const img = this.querySelector('img');
            const info = img.getAttribute('data-info').split('|');
            
            // Mostrar modal con información
            modalImagen.src = img.src;
            modalImagen.alt = img.alt;
            modalNombre.textContent = info[0];
            modalRol.textContent = info[1];
            modalDescripcion.textContent = info[2];
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Cerrar modal
    modalCerrar.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Inicializar carrusel
    actualizarCarrusel();
});