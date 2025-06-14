// main.js

const API_URL = 'https://sgrt-api.onrender.com';

// --- LÓGICA DE TEMA E AUTENTICAÇÃO (COMPARTILHADA) ---
function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('sgrt_theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if(themeToggle) themeToggle.textContent = 'Modo Claro';
    }

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggle.textContent = 'Modo Claro';
            } else {
                themeToggle.textContent = 'Modo Escuro';
            }
            localStorage.setItem('sgrt_theme', theme);
        });
    }
}

function checkAuth(requiredRole) {
    const user = JSON.parse(localStorage.getItem('sgrt_user'));
    if (!user) {
        window.location.href = '/index.html';
        return null;
    }
    if (requiredRole && user.role !== requiredRole) {
        alert('Acesso negado.');
        window.location.href = '/index.html';
        return null;
    }
    return user;
}


// --- LÓGICA ESPECÍFICA DE CADA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    setupTheme();

    if (document.body.querySelector('#login-form')) {
        // Lógica da página de login já está no index.html e não precisa ser movida
    } else if (window.location.pathname.includes('/admin.html')) {
        const user = checkAuth('ADMIN');
        if (user) setupAdminPage();
    } else if (window.location.pathname.includes('/technician.html')) {
        const user = checkAuth('TECHNICIAN');
        if (user) setupTechnicianPage(user);
    }
});

// --- FUNÇÕES DA PÁGINA ADMIN ---
function setupAdminPage() {
    // ... (Cole aqui toda a lógica JS que estava no admin.html, como loadTechnicians, loadAllOrders, etc.)
}

// --- FUNÇÕES DA PÁGINA TÉCNICO ---
function setupTechnicianPage(user) {
    // ... (Cole aqui toda a lógica JS que estava no technician.html, como loadMyRoute, updateStatus, etc.)
}
