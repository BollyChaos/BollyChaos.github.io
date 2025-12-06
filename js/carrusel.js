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

// Productos simples con scroll y expansión
document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.querySelector('.productos-simple-scroll');
    const productosItems = document.querySelectorAll('.producto-simple-item');
    
    if (!productosContainer || productosItems.length === 0) return;
    
    // Inicializar: solo el primer producto expandido
    productosItems.forEach((producto, index) => {
        if (index !== 0) {
            producto.classList.remove('expandido');
        }
    });
    
    // Configurar productos expandibles
    productosItems.forEach(producto => {
        const header = producto.querySelector('.producto-simple-header');
        const toggleBtn = producto.querySelector('.producto-simple-toggle');
        const detalle = producto.querySelector('.producto-simple-detalle');
        
        if (!header || !detalle) return;
        
        function toggleProducto() {
            const estaExpandido = producto.classList.contains('expandido');
            
            if (!estaExpandido) {
                // Cerrar todos los demás productos
                productosItems.forEach(otroProducto => {
                    if (otroProducto !== producto && otroProducto.classList.contains('expandido')) {
                        otroProducto.classList.remove('expandido');
                        const otroDetalle = otroProducto.querySelector('.producto-simple-detalle');
                        if (otroDetalle) {
                            otroDetalle.style.maxHeight = null;
                        }
                    }
                });
                
                // Expandir este producto
                producto.classList.add('expandido');
                detalle.style.maxHeight = detalle.scrollHeight + 'px';
                
                // Scroll suave para centrar el producto
                setTimeout(() => {
                    producto.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            } else {
                // Contraer este producto
                producto.classList.remove('expandido');
                detalle.style.maxHeight = null;
            }
        }
        
        // Event listeners
        header.addEventListener('click', toggleProducto);
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleProducto();
            });
        }
        
        // Accesibilidad con teclado
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleProducto();
            }
        });
        
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
    });
    
    // Configurar botones de compra
    document.querySelectorAll('.btn-detalle-comprar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const producto = this.closest('.producto-simple-item');
            const titulo = producto.querySelector('.producto-simple-titulo').textContent;
            const precio = producto.querySelector('.producto-simple-precio').textContent;
            
            // Simular compra
            const confirmar = confirm(`¿Comprar "${titulo}" por ${precio}?`);
            
            if (confirmar) {
                // Aquí iría la lógica real de compra
                alert(`Redirigiendo para comprar: ${titulo}`);
            }
        });
    });
    
    // Auto-ocultar indicador de scroll cuando hay scroll
    productosContainer.addEventListener('scroll', function() {
        const indicator = document.querySelector('.simple-scroll-indicator');
        if (indicator) {
            if (productosContainer.scrollTop > 10) {
                indicator.style.opacity = '0.3';
            } else {
                indicator.style.opacity = '0.8';
            }
        }
    });
    
    // Ajustar altura de detalles cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        productosItems.forEach(producto => {
            if (producto.classList.contains('expandido')) {
                const detalle = producto.querySelector('.producto-simple-detalle');
                if (detalle) {
                    detalle.style.maxHeight = detalle.scrollHeight + 'px';
                }
            }
        });
    });
});