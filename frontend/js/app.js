// OneHand AI - Main Application JavaScript

class AIPlatformApp {
    constructor() {
        this.currentUser = null;
        this.apiBaseUrl = '/api';
        this.init();
    }
    
    async init() {
        await this.checkAuthState();
        this.setupEventListeners();
    }
    
    async checkAuthState() {
        const token = localStorage.getItem('firebaseToken');
        if (token) {
            // Verify token with backend
            try {
                const response = await fetch(`${this.apiBaseUrl}/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    this.currentUser = await response.json();
                    this.updateUIForLoggedInUser();
                } else {
                    this.handleAuthError();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        }
    }
    
    handleAuthError() {
        localStorage.removeItem('firebaseToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.href = '/index.html';
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('/')) {
                    // Internal link
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for quick search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
        });
    }
    
    updateUIForLoggedInUser() {
        const userName = localStorage.getItem('userName') || 'User';
        const userEmail = localStorage.getItem('userEmail') || '';
        
        // Update all user info elements
        document.querySelectorAll('[data-user-name]').forEach(el => {
            el.textContent = userName;
        });
        
        document.querySelectorAll('[data-user-email]').forEach(el => {
            el.textContent = userEmail;
        });
    }
    
    openSearch() {
        // Implementation for search modal
        console.log('Opening search...');
    }
    
    async apiCall(endpoint, options = {}) {
        const token = localStorage.getItem('firebaseToken');
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        };
        
        const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
            ...defaultOptions,
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return await response.json();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AIPlatformApp();
});

// Export for global use
window.AIPlatformApp = AIPlatformApp;