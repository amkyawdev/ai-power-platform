/**
 * Main App - AI Power Platform
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initNavbar();
    initCounters();
    initScrollEffects();
    initNavigation();
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target + '+';
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function initScrollEffects() {
    const revealElements = document.querySelectorAll('.scroll-fade');
    
    window.addEventListener('scroll', () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    });
}

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

// Mobile menu
document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Auth modal handlers
const loginBtn = document.getElementById('loginBtn');
const getStartedBtn = document.getElementById('getStartedBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        showAuthModal('login');
    });
}

if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
        showAuthModal('signup');
    });
}

function showAuthModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container">
            <button class="modal-close">&times;</button>
            <div class="modal-content">
                <h2>${type === 'login' ? 'Welcome Back' : 'Get Started'}</h2>
                <p>Sign in to access your AI tools</p>
                <button class="btn-social google">
                    <i class="fab fa-google"></i>
                    Continue with Google
                </button>
                <div class="divider"><span>or</span></div>
                <form class="auth-form">
                    <input type="email" placeholder="Email address" required>
                    <input type="password" placeholder="Password" required>
                    <button type="submit" class="btn-primary btn-block">
                        ${type === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
}
