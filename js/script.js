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