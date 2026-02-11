// Datos de proyectos de ejemplo
const projectsData = [
    {
        id: 1,
        name: "Casino App",
        description: "Juego de ruleta interactivo construido con React y Node.js. Incluye sistema de apuestas, animaciones fluidas y chat en tiempo real.",
        category: "game",
        tech: ["React", "Node.js", "Socket.io", "MongoDB"],
        image: "https://www.casinogranvia.es/img/logos/pragmatic/gates-of-olympus.webp",
        author: "Sarah.js",
        stars: 245,
        forks: 67,
        url: "https://github.com/ejemplo/casino-app",
        featured: true
    },
    {
        id: 2,
        name: "Tower Defense",
        description: "Juego de estrategia tower defense desarrollado en Unity con C#. Múltiples niveles, enemigos y torres personalizables.",
        category: "game",
        tech: ["Unity", "C#", "Blender"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_qAUTZZ0nmtuPUi4SF0CW5DPl6EfVeFvhZA&s",
        author: "Diego.C#",
        stars: 189,
        forks: 43,
        url: "https://github.com/ejemplo/tower-defense",
        featured: false
    },
    {
        id: 3,
        name: "EcoTrack - Sostenibilidad",
        description: "Aplicación para monitoreo de huella de carbono personal con recomendaciones IA y visualización de datos.",
        category: "web",
        tech: ["React", "Node.js", "TensorFlow", "Chart.js"],
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
        author: "Alex.Js",
        stars: 320,
        forks: 98,
        url: "https://github.com/ejemplo/ecotrack",
        featured: true
    },
    {
        id: 4,
        name: "TaskMaster Pro",
        description: "Gestor de tareas y proyectos con tableros Kanban, colaboración en tiempo real y estadísticas de productividad.",
        category: "web",
        tech: ["Vue.js", "Express", "PostgreSQL", "Redis"],
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500",
        author: "Maria.Py",
        stars: 276,
        forks: 85,
        url: "https://github.com/ejemplo/taskmaster",
        featured: false
    },
    {
        id: 5,
        name: "AI Chatbot",
        description: "Chatbot inteligente con procesamiento de lenguaje natural usando GPT y sistema de aprendizaje continuo.",
        category: "ai",
        tech: ["Python", "TensorFlow", "Flask", "OpenAI"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500",
        author: "Carlos.AI",
        stars: 412,
        forks: 156,
        url: "https://github.com/ejemplo/ai-chatbot",
        featured: true
    },
    {
        id: 6,
        name: "FitTrack Mobile",
        description: "App móvil para seguimiento de ejercicio y nutrición con planes personalizados y recordatorios inteligentes.",
        category: "mobile",
        tech: ["React Native", "Firebase", "Node.js"],
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500",
        author: "Laura.Mobile",
        stars: 198,
        forks: 54,
        url: "https://github.com/ejemplo/fittrack",
        featured: false
    },
    {
        id: 7,
        name: "Code Snippets Manager",
        description: "Herramienta para gestionar y compartir fragmentos de código con resaltado de sintaxis y búsqueda avanzada.",
        category: "tool",
        tech: ["Electron", "React", "SQLite"],
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500",
        author: "Pedro.Dev",
        stars: 167,
        forks: 39,
        url: "https://github.com/ejemplo/code-snippets",
        featured: false
    },
    {
        id: 8,
        name: "E-Commerce Platform",
        description: "Plataforma completa de comercio electrónico con carrito, pagos, inventario y panel de administración.",
        category: "web",
        tech: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500",
        author: "Ana.Commerce",
        stars: 345,
        forks: 123,
        url: "https://github.com/ejemplo/ecommerce",
        featured: true
    },
    {
        id: 9,
        name: "Weather Forecast ML",
        description: "Predicción meteorológica usando machine learning con visualización interactiva de datos históricos.",
        category: "ai",
        tech: ["Python", "Scikit-learn", "Django", "D3.js"],
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500",
        author: "Roberto.Data",
        stars: 221,
        forks: 71,
        url: "https://github.com/ejemplo/weather-ml",
        featured: false
    },
    {
        id: 10,
        name: "Social Media Dashboard",
        description: "Dashboard para análisis de redes sociales con métricas en tiempo real y reportes automatizados.",
        category: "web",
        tech: ["Angular", "Node.js", "MongoDB", "Chart.js"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
        author: "Julia.Analytics",
        stars: 289,
        forks: 94,
        url: "https://github.com/ejemplo/social-dashboard",
        featured: false
    },
    {
        id: 11,
        name: "Music Streaming App",
        description: "Aplicación de streaming de música con playlists personalizadas, recomendaciones IA y modo offline.",
        category: "mobile",
        tech: ["Flutter", "Firebase", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        author: "Miguel.Audio",
        stars: 387,
        forks: 142,
        url: "https://github.com/ejemplo/music-stream",
        featured: true
    },
    {
        id: 12,
        name: "DevOps Automation Tool",
        description: "Suite de automatización para CI/CD, deployment y monitoreo de aplicaciones con Docker y Kubernetes.",
        category: "tool",
        tech: ["Go", "Docker", "Kubernetes", "Terraform"],
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500",
        author: "Sergio.Ops",
        stars: 456,
        forks: 178,
        url: "https://github.com/ejemplo/devops-tool",
        featured: true
    }
];

let currentFilter = 'all';
let displayedProjects = 6;
const projectsPerLoad = 6;

// Renderizar proyectos
function renderProjects(projects = null) {
    const container = document.getElementById('projects-container');
    const projectsToRender = projects || projectsData.slice(0, displayedProjects);
    
    if (projectsToRender.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <span class="material-symbols-outlined text-secondary" style="font-size: 64px;">search_off</span>
                <p class="text-secondary mt-3">No se encontraron proyectos con estos criterios</p>
            </div>
        `;
        return;
    }
    
    const html = projectsToRender.map(project => `
        <div class="col-md-6 project-card" data-category="${project.category}">
            <div class="card bg-card neon-hover h-100">
                <div class="project-img" style="background-image: url('${project.image}')"></div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="fw-bold mb-0">${project.name}</h5>
                        ${project.featured ? '<span class="badge bg-warning">Destacado</span>' : ''}
                    </div>
                    <p class="text-secondary small mb-3">${project.description}</p>
                    
                    <div class="d-flex flex-wrap gap-1 mb-3">
                        ${project.tech.map(tech => `<span class="badge bg-primary">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex gap-3 text-secondary small">
                            <span>
                                <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">star</span>
                                ${project.stars}
                            </span>
                            <span>
                                <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">fork_right</span>
                                ${project.forks}
                            </span>
                        </div>
                        <button class="btn btn-sm btn-outline-primary" onclick="showProjectDetail(${project.id})">
                            Ver más
                        </button>
                    </div>
                    
                    <div class="mt-2">
                        <small class="text-secondary">Por ${project.author}</small>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    
    // Mostrar/ocultar botón "Cargar más"
    const loadMoreBtn = document.getElementById('loadMoreProjects');
    if (displayedProjects >= projectsData.length || projects !== null) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Mostrar detalles de proyecto
function showProjectDetail(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const content = `
        <div class="project-img mb-4" style="background-image: url('${project.image}'); height: 250px; border-radius: 8px;"></div>
        
        <h4 class="fw-bold mb-3">${project.name}</h4>
        
        <p class="text-secondary mb-4">${project.description}</p>
        
        <div class="mb-4">
            <h6 class="fw-bold mb-2">Tecnologías utilizadas:</h6>
            <div class="d-flex flex-wrap gap-2">
                ${project.tech.map(tech => `<span class="badge bg-primary">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="row g-3 mb-4">
            <div class="col-6">
                <div class="card bg-secondary bg-opacity-10 p-3 text-center">
                    <span class="material-symbols-outlined text-primary mb-1" style="font-size: 32px;">star</span>
                    <h5 class="fw-bold mb-0">${project.stars}</h5>
                    <small class="text-secondary">Stars</small>
                </div>
            </div>
            <div class="col-6">
                <div class="card bg-secondary bg-opacity-10 p-3 text-center">
                    <span class="material-symbols-outlined text-primary mb-1" style="font-size: 32px;">fork_right</span>
                    <h5 class="fw-bold mb-0">${project.forks}</h5>
                    <small class="text-secondary">Forks</small>
                </div>
            </div>
        </div>
        
        <div class="mb-4">
            <h6 class="fw-bold mb-2">Autor:</h6>
            <div class="d-flex align-items-center gap-2">
                <img src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png" 
                     class="rounded-circle border border-primary" width="40" alt="${project.author}">
                <strong>${project.author}</strong>
            </div>
        </div>
        
        <div class="d-grid gap-2">
            <a href="${project.url}" target="_blank" class="btn btn-primary">
                <span class="material-symbols-outlined me-2" style="font-size: 20px; vertical-align: middle;">code</span>
                Ver en GitHub
            </a>
            <button class="btn btn-outline-primary">
                <span class="material-symbols-outlined me-2" style="font-size: 20px; vertical-align: middle;">star</span>
                Dar Estrella
            </button>
        </div>
    `;
    
    document.getElementById('project-detail-content').innerHTML = content;
    const modal = new bootstrap.Modal(document.getElementById('projectDetailModal'));
    modal.show();
}

// Filtrar proyectos
function filterProjects(category) {
    currentFilter = category;
    displayedProjects = projectsPerLoad;
    
    if (category === 'all') {
        renderProjects();
    } else {
        const filtered = projectsData.filter(p => p.category === category);
        renderProjects(filtered);
    }
    
    // Actualizar chips activos
    document.querySelectorAll('.chip').forEach(chip => {
        chip.classList.remove('active');
        if (chip.dataset.filter === category) {
            chip.classList.add('active');
        }
    });
}

// Buscar proyectos
function searchProjects(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        filterProjects(currentFilter);
        return;
    }
    
    const filtered = projectsData.filter(project => {
        const nameMatch = project.name.toLowerCase().includes(searchTerm);
        const descMatch = project.description.toLowerCase().includes(searchTerm);
        const techMatch = project.tech.some(tech => tech.toLowerCase().includes(searchTerm));
        const categoryMatch = project.category.toLowerCase().includes(searchTerm);
        
        return nameMatch || descMatch || techMatch || categoryMatch;
    });
    
    renderProjects(filtered);
}

// Cargar más proyectos
function loadMoreProjects() {
    displayedProjects += projectsPerLoad;
    renderProjects();
    
    // Scroll suave a los nuevos proyectos
    setTimeout(() => {
        const container = document.getElementById('projects-container');
        const lastCard = container.lastElementChild;
        if (lastCard) {
            lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 100);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar proyectos iniciales
    renderProjects();
    
    // Filtros
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            filterProjects(this.dataset.filter);
        });
    });
    
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchProjects(this.value);
        }, 300);
    });
    
    // Botón cargar más
    document.getElementById('loadMoreProjects').addEventListener('click', loadMoreProjects);
    
    // Formulario de subir proyecto
    const submitForm = document.getElementById('submit-project-form');
    if (submitForm) {
        submitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el proyecto
            alert('¡Proyecto enviado exitosamente! Será revisado por nuestro equipo.');
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('submitProjectModal'));
            modal.hide();
            submitForm.reset();
        });
    }
});

// Hacer la función global para poder llamarla desde onclick
window.showProjectDetail = showProjectDetail;
