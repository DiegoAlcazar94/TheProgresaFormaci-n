// ========== THEME TOGGLE FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('Script cargado - Inicializando tema');
  
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const body = document.body;
  
  console.log('Botón encontrado:', themeToggle ? 'Sí' : 'No');
  
  // Obtener tema guardado o detectar preferencia del sistema
  const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  console.log('Tema a aplicar:', savedTheme);
  
  // Aplicar tema inicial
  root.setAttribute('data-theme', savedTheme);
  body.classList.add('theme-' + savedTheme);
  console.log('Atributo data-theme establecido a:', root.getAttribute('data-theme'));
  console.log('Clase body:', body.className);
  
  // Event listener para el botón toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      console.log('Click detectado - Tema actual:', currentTheme, '- Nuevo tema:', newTheme);
      
      root.setAttribute('data-theme', newTheme);
      body.classList.remove('theme-' + currentTheme);
      body.classList.add('theme-' + newTheme);
      localStorage.setItem('theme', newTheme);
      
      console.log('Tema actualizado a:', root.getAttribute('data-theme'));
      console.log('Clase body actualizada:', body.className);
    });
  }
  
  // ========== CARGAR MÁS PROYECTOS ==========
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