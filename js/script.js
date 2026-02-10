// Inicializar tema ANTES de que el DOM se cargue completamente
(function() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', savedTheme);
  if (document.body) {
    document.body.classList.add('theme-' + savedTheme);
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  console.log('Script cargado - Inicializando tema');
  
  const themeToggles = Array.from(document.querySelectorAll('.theme-toggle-btn'));
  const root = document.documentElement;
  const body = document.body;
  
  console.log('Botones toggle encontrados:', themeToggles.length);
  const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  console.log('Tema a aplicar:', savedTheme);
  root.setAttribute('data-theme', savedTheme);
  body.classList.add('theme-' + savedTheme);
  console.log('Atributo data-theme establecido a:', root.getAttribute('data-theme'));
  console.log('Clase body:', body.className);
  if (themeToggles.length) {
    themeToggles.forEach(btn => {
      btn.addEventListener('click', function() {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        console.log('Click detectado - Tema actual:', currentTheme, '- Nuevo tema:', newTheme);

        root.setAttribute('data-theme', newTheme);
        body.classList.remove('theme-' + currentTheme);
        body.classList.add('theme-' + newTheme);
        localStorage.setItem('theme', newTheme);
        updateDisplay();

        console.log('Tema actualizado a:', root.getAttribute('data-theme'));
        console.log('Clase body actualizada:', body.className);
      });
    });
  }

  // Update display elements if present (moved from test.html/prueba.html)
  function updateDisplay() {
    const currentTheme = root.getAttribute('data-theme');
    const statusEl = document.getElementById('status');
    const themeValueEl = document.getElementById('theme-value');

    if (statusEl) statusEl.textContent = currentTheme === 'dark' ? 'Oscuro' : 'Luz';
    if (themeValueEl) themeValueEl.textContent = currentTheme;
  }

  updateDisplay();
  const loadMoreBtn = document.getElementById('load-more-btn');
  const closeProjectsBtn = document.getElementById('close-projects-btn');
  const moreProjects = document.getElementById('more-projects');
  if (loadMoreBtn && closeProjectsBtn && moreProjects) {
    loadMoreBtn.addEventListener('click', function() {
      moreProjects.classList.remove('d-none');
      loadMoreBtn.classList.add('d-none');
      closeProjectsBtn.classList.remove('d-none');
      setTimeout(() => {
        moreProjects.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
    closeProjectsBtn.addEventListener('click', function() {
      moreProjects.classList.add('d-none');
      loadMoreBtn.classList.remove('d-none');
      closeProjectsBtn.classList.add('d-none');
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
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout-btn');
  const loginBtnContainer = document.getElementById('login-btn-container');
  const userAvatarContainer = document.getElementById('user-avatar-container');
  const userNameEl = document.getElementById('user-name');
  const userEmailEl = document.getElementById('user-email');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  if (isLoggedIn && userName && userEmail) {
    loginBtnContainer?.classList.add('d-none');
    userAvatarContainer?.classList.remove('d-none');
    if (userNameEl) userNameEl.textContent = userName;
    if (userEmailEl) userEmailEl.textContent = userEmail;
  } else {
    loginBtnContainer?.classList.remove('d-none');
    userAvatarContainer?.classList.add('d-none');
  }
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      if (email && password) {
        const name = email.split('@')[0];
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        loginBtnContainer?.classList.add('d-none');
        userAvatarContainer?.classList.remove('d-none');
        if (userNameEl) userNameEl.textContent = name;
        if (userEmailEl) userEmailEl.textContent = email;
        loginForm.reset();
      }
    });
  }
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      
      loginBtnContainer?.classList.remove('d-none');
      userAvatarContainer?.classList.add('d-none');
    });
  }
});