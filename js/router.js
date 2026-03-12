/**
 * Router - SPA Navigation
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentPage = null;
        
        window.addEventListener('popstate', () => {
            this.navigate(window.location.hash.slice(1) || '/', false);
        });
    }
    
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    
    navigate(path, pushState = true) {
        if (pushState) {
            window.history.pushState(null, '', '#' + path);
        }
        
        const handler = this.routes[path];
        if (handler) {
            handler();
            this.currentPage = path;
        }
        
        window.scrollTo(0, 0);
    }
    
    getParams() {
        const hash = window.location.hash.slice(1);
        const params = {};
        
        if (hash.includes('?')) {
            const [path, query] = hash.split('?');
            query.split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[key] = decodeURIComponent(value);
            });
        }
        
        return params;
    }
    
    init() {
        const hash = window.location.hash.slice(1) || '/';
        this.navigate(hash, false);
    }
}

const router = new Router();

// Define routes
router.addRoute('/', () => {
    showPage('dashboard');
});

router.addRoute('dashboard', () => {
    showPage('dashboard');
});

router.addRoute('chat', () => {
    showPage('chat');
});

router.addRoute('image', () => {
    showPage('image');
});

router.addRoute('code', () => {
    showPage('code');
});

router.addRoute('website', () => {
    showPage('website');
});

router.addRoute('prompt', () => {
    showPage('prompt');
});

router.addRoute('projects', () => {
    showPage('projects');
});

router.addRoute('settings', () => {
    showPage('settings');
});

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) {
            item.classList.add('active');
        }
    });
    
    // Update URL
    window.location.hash = pageId;
}

// Export
window.router = router;
window.showPage = showPage;
