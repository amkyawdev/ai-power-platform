// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5BS_7xfD1-VhGYlBfkKLBkHUKnkZXBsg",
    authDomain: "amkyawdev.firebaseapp.com",
    projectId: "amkyawdev",
    storageBucket: "amkyawdev.firebasestorage.app",
    messagingSenderId: "242883286611",
    appId: "1:242883286611:web:a61ea6d9d294c49b0618a6",
    measurementId: "G-VF8XVGCWM2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth Functions
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Sign in with Google
async function signInWithGoogle() {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const token = await result.user.getIdToken();
        
        localStorage.setItem('firebaseToken', token);
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', result.user.displayName);
        
        return result.user;
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
    }
}

// Sign in with email
async function signInWithEmail(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        const token = await result.user.getIdToken();
        
        localStorage.setItem('firebaseToken', token);
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', result.user.email.split('@')[0]);
        
        return result.user;
    } catch (error) {
        console.error('Email Sign-In Error:', error);
        throw error;
    }
}

// Sign up with email
async function signUpWithEmail(email, password, username) {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        await result.user.updateProfile({ displayName: username });
        
        const token = await result.user.getIdToken();
        
        localStorage.setItem('firebaseToken', token);
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', username);
        
        return result.user;
    } catch (error) {
        console.error('Email Sign-Up Error:', error);
        throw error;
    }
}

// Sign out
async function signOut() {
    try {
        await auth.signOut();
        localStorage.removeItem('firebaseToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
    } catch (error) {
        console.error('Sign-Out Error:', error);
        throw error;
    }
}

// Get current user
function getCurrentUser() {
    return auth.currentUser;
}

// Get ID token
async function getIdToken() {
    const user = auth.currentUser;
    if (user) {
        return await user.getIdToken();
    }
    return null;
}

// Check auth state
function onAuthStateChange(callback) {
    return auth.onAuthStateChanged(callback);
}

// API helper function
async function apiCall(endpoint, method = 'GET', body = null) {
    const token = await getIdToken();
    
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return await response.json();
}

// Export functions
window.FirebaseAuth = {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getCurrentUser,
    getIdToken,
    onAuthStateChange,
    apiCall
};