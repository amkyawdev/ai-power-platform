/**
 * UI Effects - AI Power Platform
 */

document.addEventListener('DOMContentLoaded', () => {
    initUI();
});

function initUI() {
    initRevealAnimations();
    initParallax();
    initTiltEffects();
    initTooltips();
    initModals();
    initTabs();
    initCopyButtons();
    initDashboardRouter();
}

function initRevealAnimations() {
    const reveals = document.querySelectorAll('.scroll-fade, [data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle staggered animations
                const parent = entry.target.parentElement;
                if (parent?.classList.contains('entry-stagger')) {
                    parent.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    reveals.forEach(el => observer.observe(el));
}

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

function initTiltEffects() {
    const tiltCards = document.querySelectorAll('.tilt-3d');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.querySelector('.tilt-3d-inner')?.style.transform = 
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.tilt-3d-inner')?.style.transform = 
                'rotateX(0) rotateY(0)';
        });
    });
}

function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(el => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        el.addEventListener('mouseenter', (e) => {
            const rect = el.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 10 + 'px';
            tooltip.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
}

function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal;
            openModal(modalId);
        });
    });
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initTabs() {
    const tabButtons = document.querySelectorAll('.studio-tab, [data-tab]');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Update buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update panels
            document.querySelectorAll('.studio-panel, .page').forEach(panel => {
                panel.classList.remove('active');
            });
            
            const targetPanel = document.getElementById(tabId + 'Panel');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function initCopyButtons() {
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.copy-btn');
        if (!btn) return;
        
        const container = btn.closest('.code-output, .prompt-result');
        const codeEl = container?.querySelector('code, .optimized-content');
        
        if (codeEl) {
            const text = codeEl.textContent;
            await navigator.clipboard.writeText(text);
            
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        }
    });
}

function initDashboardRouter() {
    // Handle URL parameters for dashboard
    const urlParams = new URLSearchParams(window.location.search);
    const tool = urlParams.get('tool');
    
    if (tool) {
        // Update sidebar active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === tool) {
                item.classList.add('active');
            }
        });
        
        // Show corresponding page
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        const targetPage = document.getElementById(tool + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }
    
    // Handle sidebar navigation
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Show page
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            const targetPage = document.getElementById(page + 'Page');
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Update URL
            window.history.pushState(null, '', `?tool=${page}`);
        });
    });
    
    // Handle studio tabs
    const studioTabs = document.querySelectorAll('.studio-tab');
    studioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            // Update tabs
            studioTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update panels
            document.querySelectorAll('.studio-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            const targetPanel = document.getElementById(tabId + 'Panel');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Sidebar toggle for mobile
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (sidebar && !sidebar.contains(e.target) && !sidebarToggle?.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
    
    // Ctrl+K to search
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.topbar-search input')?.focus();
    }
});

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (btn && !btn.classList.contains('ripple')) {
        btn.classList.add('ripple');
    }
});

// Export functions
window.openModal = openModal;
window.closeModal = closeModal;
