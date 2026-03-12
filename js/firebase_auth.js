/**
 * Firebase Auth - AI Power Platform
 */

class FirebaseAuth {
    constructor() {
        this.user = null;
        this.listeners = [];
    }

    // Initialize Firebase
    async init() {
        // Firebase config - will be loaded from config/firebase.js
        if (typeof firebaseConfig !== 'undefined') {
            try {
                firebase.initializeApp(firebaseConfig);
                this.auth = firebase.auth();
                
                // Listen for auth state changes
                this.auth.onAuthStateChanged((user) => {
                    this.user = user;
                    this.notifyListeners(user);
                });
                
                return true;
            } catch (error) {
                console.log('Firebase init error:', error);
                return false;
            }
        }
        return false;
    }

    // Sign in with Google
    async signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await this.auth.signInWithPopup(provider);
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Google sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign in with email
    async signInWithEmail(email, password) {
        try {
            const result = await this.auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Email sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign up with email
    async signUpWithEmail(email, password, username) {
        try {
            const result = await this.auth.createUserWithEmailAndPassword(email, password);
            if (result.user) {
                await result.user.updateProfile({ displayName: username });
            }
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign out
    async signOut() {
        try {
            await this.auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get current user
    getCurrentUser() {
        return this.user;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.user !== null;
    }

    // Auth state listener
    onAuthStateChanged(callback) {
        this.listeners.push(callback);
        if (this.user) {
            callback(this.user);
        }
    }

    // Notify all listeners
    notifyListeners(user) {
        this.listeners.forEach(callback => callback(user));
    }
}

// Demo mode auth (when Firebase is not available)
class DemoAuth {
    constructor() {
        this.user = null;
        this.listeners = [];
    }

    async init() {
        // Check localStorage for demo user
        const stored = localStorage.getItem('demo_user');
        if (stored) {
            this.user = JSON.parse(stored);
            this.notifyListeners(this.user);
        }
        return true;
    }

    async signInWithGoogle() {
        this.user = {
            uid: 'demo_' + Date.now(),
            displayName: 'Demo User',
            email: 'demo@example.com',
            photoURL: null
        };
        localStorage.setItem('demo_user', JSON.stringify(this.user));
        this.notifyListeners(this.user);
        return { success: true, user: this.user };
    }

    async signInWithEmail(email, password) {
        return this.signInWithGoogle();
    }

    async signUpWithEmail(email, password, username) {
        return this.signInWithGoogle();
    }

    async signOut() {
        this.user = null;
        localStorage.removeItem('demo_user');
        this.notifyListeners(null);
        return { success: true };
    }

    getCurrentUser() {
        return this.user;
    }

    isLoggedIn() {
        return this.user !== null;
    }

    onAuthStateChanged(callback) {
        this.listeners.push(callback);
        if (this.user) {
            callback(this.user);
        }
    }

    notifyListeners(user) {
        this.listeners.forEach(cb => cb(user));
    }
}

// Export
window.firebaseAuth = null;
window.authListeners = [];

// Initialize auth
document.addEventListener('DOMContentLoaded', async () => {
    // Try Firebase first, fallback to demo
    window.firebaseAuth = new FirebaseAuth();
    const initialized = await firebaseAuth.init();
    
    if (!initialized) {
        console.log('Using demo auth mode');
        window.firebaseAuth = new DemoAuth();
        await firebaseAuth.init();
    }

    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await firebaseAuth.signOut();
            window.location.href = '/';
        });
    }

    // Update UI based on auth state
    firebaseAuth.onAuthStateChanged((user) => {
        updateAuthUI(user);
    });
});

function updateAuthUI(user) {
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const loginBtn = document.getElementById('loginBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');

    if (user) {
        if (userAvatar) {
            userAvatar.innerHTML = user.photoURL 
                ? `<img src="${user.photoURL}" alt="${user.displayName}">`
                : `<i class="fas fa-user"></i>`;
        }
        if (userName) {
            userName.textContent = user.displayName || 'User';
        }
    } else {
        if (userAvatar) {
            userAvatar.innerHTML = `<i class="fas fa-user"></i>`;
        }
        if (userName) {
            userName.textContent = 'Guest';
        }
    }
}
