// Funcionalidad para cargar más proyectos en el index
document.addEventListener('DOMContentLoaded', function() {
  // Obtener elementos
  const loadMoreBtn = document.getElementById('load-more-btn');
  const closeProjectsBtn = document.getElementById('close-projects-btn');
  const moreProjects = document.getElementById('more-projects');

  // Verificar que los elementos existen (solo en la página index)
  if (loadMoreBtn && closeProjectsBtn && moreProjects) {
    
    // Event listener para el botón "Cargar más proyectos"
    loadMoreBtn.addEventListener('click', function() {
      // Mostrar proyectos adicionales
      moreProjects.classList.remove('d-none');
      
      // Ocultar botón "Cargar más"
      loadMoreBtn.classList.add('d-none');
      
      // Mostrar botón "Cerrar proyectos"
      closeProjectsBtn.classList.remove('d-none');
      
      // Scroll suave hacia los nuevos proyectos
      setTimeout(() => {
        moreProjects.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });

    // Event listener para el botón "Cerrar proyectos"
    closeProjectsBtn.addEventListener('click', function() {
      // Ocultar proyectos adicionales
      moreProjects.classList.add('d-none');
      
      // Mostrar botón "Cargar más"
      loadMoreBtn.classList.remove('d-none');
      
      // Ocultar botón "Cerrar proyectos"
      closeProjectsBtn.classList.add('d-none');
      
      // Scroll suave de vuelta al botón
      setTimeout(() => {
        loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  }

  // Funcionalidad para cargar más miembros en la página de comunidad
  const loadMembersBtn = document.getElementById('load-members-btn');
  if (loadMembersBtn) {
    loadMembersBtn.addEventListener('click', function() {
      // Simular carga con efecto visual
      const originalText = loadMembersBtn.innerHTML;
      loadMembersBtn.innerHTML = '<span class="material-symbols-outlined me-2" style="font-size: 20px; vertical-align: middle; display: inline-block; animation: spin 1s linear infinite;">refresh</span>Cargando...';
      loadMembersBtn.disabled = true;
      
      // Simular carga de 1.5 segundos
      setTimeout(() => {
        loadMembersBtn.innerHTML = originalText;
        loadMembersBtn.disabled = false;
        // Aquí iría la lógica para cargar más miembros
        alert('Más miembros cargados exitosamente!');
      }, 1500);
    });
  }

  // Función para animar números de forma progresiva
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      // Solo animar si todavía no se ha animado
      if (!counter.hasAttribute('data-animated')) {
        const target = parseInt(counter.getAttribute('data-target'));
        const isXP = counter.textContent.includes('XP');
        const duration = 1500; // milisegundos
        const increment = target / (duration / 30); // actualizar cada 30ms
        let current = 0;

        const updateCounter = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(updateCounter);
            counter.setAttribute('data-animated', 'true');
          }
          counter.textContent = Math.floor(current) + (isXP ? ' XP' : '');
        }, 30);
      }
    });
  }

  // Animar contadores cuando se abre un modal
  document.addEventListener('show.bs.modal', function(e) {
    setTimeout(animateCounters, 100);
  });

  // Animar contadores en la página principal al cargar
  window.addEventListener('load', animateCounters);
  
  // También animar cuando se hace scroll hacia los contadores
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, observerOptions);

  document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
  });
  
  // Efecto de scroll en el header (opcional)
  const header = document.querySelector('header.glass');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
});