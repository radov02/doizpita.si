// DoIzpita.si - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeModals();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

// Modal functionality
function initializeModals() {
    // Login form handling
    const loginForm = document.querySelector('#loginModal form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Registration form handling
    const registerForm = document.querySelector('#registerModal form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });
    }
}

// Animation initialization
function initializeAnimations() {
    // Fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('.feature-card, .process-step, .card').forEach(el => {
        observer.observe(el);
    });
}

// Login handling
function handleLogin() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    
    if (!email || !password) {
        showAlert('Prosimo, izpolnite vsa polja.', 'warning');
        return;
    }

    // Show loading state
    const loginBtn = document.querySelector('#loginModal .btn-primary');
    const originalText = loginBtn.textContent;
    loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Prijavljam...';
    loginBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
        
        // Close modal and show success
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        showAlert('Uspešno ste se prijavili!', 'success');
        
        // Redirect to progress page or update UI
        setTimeout(() => {
            window.location.href = 'moja-pot-do-izpita.html';
        }, 1500);
    }, 2000);
}

// Registration handling
function handleRegistration() {
    const name = document.querySelector('#regName').value;
    const email = document.querySelector('#regEmail').value;
    const password = document.querySelector('#regPassword').value;
    const passwordConfirm = document.querySelector('#regPasswordConfirm').value;
    const terms = document.querySelector('#terms').checked;
    
    if (!name || !email || !password || !passwordConfirm) {
        showAlert('Prosimo, izpolnite vsa polja.', 'warning');
        return;
    }

    if (password !== passwordConfirm) {
        showAlert('Gesli se ne ujemata.', 'warning');
        return;
    }

    if (!terms) {
        showAlert('Prosimo, sprejmite pogoje uporabe.', 'warning');
        return;
    }

    // Show loading state
    const registerBtn = document.querySelector('#registerModal .btn-primary');
    const originalText = registerBtn.textContent;
    registerBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registriram...';
    registerBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        registerBtn.textContent = originalText;
        registerBtn.disabled = false;
        
        // Close modal and show success
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();
        showAlert('Uspešno ste se registrirali! Preverite svoj e-poštni naslov.', 'success');
    }, 2000);
}

// Utility function to show alerts
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert-temporary');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show alert-temporary`;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '300px';
    
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert && alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('sl-SI', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Utility function to format date
function formatDate(date) {
    return new Intl.DateTimeFormat('sl-SI', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Export functions for use in other files
window.DoIzpita = {
    showAlert,
    formatCurrency,
    formatDate
};