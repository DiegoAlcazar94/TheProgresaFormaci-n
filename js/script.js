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

  function updateDisplay() {
    const currentTheme = root.getAttribute('data-theme');
    const statusEl = document.getElementById('status');
    const themeValueEl = document.getElementById('theme-value');
    if (statusEl) statusEl.textContent = currentTheme === 'dark' ? 'Oscuro' : 'Luz';
    if (themeValueEl) themeValueEl.textContent = currentTheme;
  }

  updateDisplay();

  // ===============================================
  //   CHIP AUTOCOMPLETE + BÚSQUEDA EN PROYECTOS
  // ===============================================
  const searchInput = document.querySelector('input[type="search"]');
  const chips = document.querySelectorAll('.chip');

  // Recoge TODAS las tarjetas de proyecto (visibles y ocultas)
  function getAllProjectCards() {
    return document.querySelectorAll('#featured-projects .col-12, #more-projects .col-12');
  }

  // Muestra u oculta tarjetas según el término de búsqueda
  // Si query está vacío, muestra todas
  function filterProjects(query) {
    const term = query.trim().toLowerCase();
    const allCards = getAllProjectCards();
    let anyVisible = false;

    allCards.forEach(col => {
      const article = col.querySelector('article');
      if (!article) return;

      // Texto del título y descripción
      const title = article.querySelector('h5')?.textContent.toLowerCase() || '';
      const desc  = article.querySelector('p')?.textContent.toLowerCase() || '';
      // Badges (React, Node.js, etc.)
      const badges = Array.from(article.querySelectorAll('.badge'))
          .map(b => b.textContent.toLowerCase()).join(' ');

      const matches = term === '' ||
          title.includes(term) ||
          desc.includes(term)  ||
          badges.includes(term);

      col.style.display = matches ? '' : 'none';
      if (matches) anyVisible = true;
    });

    // Mensaje de "sin resultados"
    let noResults = document.getElementById('no-results-msg');
    if (!anyVisible && term !== '') {
      if (!noResults) {
        noResults = document.createElement('p');
        noResults.id = 'no-results-msg';
        noResults.className = 'text-muted text-center w-100 mt-3';
        noResults.textContent = 'No se encontraron proyectos con ese filtro.';
        document.getElementById('featured-projects')?.after(noResults);
      }
      noResults.style.display = '';
    } else if (noResults) {
      noResults.style.display = 'none';
    }
  }

  if (searchInput && chips.length) {
    // --- Chips ---
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const value = chip.textContent.trim();

        if (value === 'All Systems') {
          searchInput.value = '';
          filterProjects('');           // Mostrar todos al resetear
          searchInput.focus();
          return;
        }

        searchInput.value = value;
        filterProjects(value);          // Filtrar inmediatamente al hacer clic
        searchInput.focus();
      });
    });

    // --- Sincronizar chip activo al escribir ---
    searchInput.addEventListener('input', () => {
      const typed = searchInput.value.trim().toLowerCase();

      chips.forEach(chip => {
        const chipText = chip.textContent.trim().toLowerCase();
        if (typed === '' && chipText === 'all systems') {
          chip.classList.add('active');
        } else if (typed !== '' && chipText === typed) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });

      // Si borra todo, restaurar proyectos
      if (typed === '') filterProjects('');
    });

    // --- Enter: ejecutar búsqueda ---
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterProjects(searchInput.value);

        // Si el texto coincide exactamente con un chip, activarlo
        const typed = searchInput.value.trim().toLowerCase();
        chips.forEach(chip => {
          chip.classList.toggle('active', chip.textContent.trim().toLowerCase() === typed);
        });

        // Si no coincide ninguno y hay texto, desactivar todos excepto ninguno
        const anyActive = Array.from(chips).some(c => c.classList.contains('active'));
        if (!anyActive && typed !== '') {
          chips.forEach(c => c.classList.remove('active'));
        }
      }
    });
  }

  // ===============================================
  //   LOAD MORE / CLOSE PROJECTS
  // ===============================================
  const loadMoreBtn = document.getElementById('load-more-btn');
  const closeProjectsBtn = document.getElementById('close-projects-btn');
  const moreProjects = document.getElementById('more-projects');

  if (loadMoreBtn && closeProjectsBtn && moreProjects) {
    loadMoreBtn.addEventListener('click', function() {
      moreProjects.classList.remove('d-none');
      loadMoreBtn.classList.add('d-none');
      closeProjectsBtn.classList.remove('d-none');

      // Re-aplicar filtro activo a los nuevos proyectos recién visibles
      if (searchInput) filterProjects(searchInput.value);

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
      const originalText = loadMembersBtn.innerHTML;
      loadMembersBtn.innerHTML = '<span class="material-symbols-outlined me-2" style="font-size: 20px; vertical-align: middle; display: inline-block; animation: spin 1s linear infinite;">refresh</span>Cargando...';
      loadMembersBtn.disabled = true;
      setTimeout(() => {
        loadMembersBtn.innerHTML = originalText;
        loadMembersBtn.disabled = false;
        alert('Más miembros cargados exitosamente!');
      }, 1500);
    });
  }

  // ===============================================
  //   ANIMACIÓN DE CONTADORES
  // ===============================================
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      if (!counter.hasAttribute('data-animated')) {
        const target = parseInt(counter.getAttribute('data-target'));
        const isXP = counter.textContent.includes('XP');
        const duration = 1500;
        const increment = target / (duration / 30);
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

  document.addEventListener('show.bs.modal', function() {
    setTimeout(animateCounters, 100);
  });

  window.addEventListener('load', animateCounters);

  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCounters();
    });
  }, observerOptions);

  document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
  });

  // ===============================================
  //   SCROLL HEADER
  // ===============================================
  const header = document.querySelector('header.glass');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===============================================
  //   LOGIN / LOGOUT
  // ===============================================
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