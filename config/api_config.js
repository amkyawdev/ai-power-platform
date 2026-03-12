/**
 * API Configuration - AI Power Platform
 */

// API Base URL
const API_BASE_URL = window.location.origin + '/api';

// AI Service Configuration
const AI_CONFIG = {
    // OpenAI Configuration
    openai: {
        model: 'gpt-4',
        max_tokens: 4000,
        temperature: 0.7
    },
    
    // Stability AI Configuration
    stability: {
        engine: 'stable-diffusion-xl-1024-v1-0',
        steps: 30,
        guidance: 7.5
    },
    
    // Default settings
    defaultModel: 'gpt-4',
    defaultImageSize: '1024x1024',
    defaultCodeLanguage: 'python'
};

// API Endpoints
const API_ENDPOINTS = {
    // AI Endpoints
    ai: {
        chat: `${API_BASE_URL}/ai/chat`,
        image: `${API_BASE_URL}/ai/image`,
        code: `${API_BASE_URL}/ai/code`,
        website: `${API_BASE_URL}/ai/website`,
        prompt: `${API_BASE_URL}/ai/prompt`
    },
    
    // User Endpoints
    users: {
        register: `${API_BASE_URL}/users/register`,
        profile: `${API_BASE_URL}/users/profile`,
        update: `${API_BASE_URL}/users/update`
    },
    
    // Project Endpoints
    projects: {
        list: `${API_BASE_URL}/projects`,
        create: `${API_BASE_URL}/projects/create`,
        get: (id) => `${API_BASE_URL}/projects/${id}`,
        update: (id) => `${API_BASE_URL}/projects/${id}`,
        delete: (id) => `${API_BASE_URL}/projects/${id}`
    }
};

// Export
window.API_CONFIG = AI_CONFIG;
window.API_ENDPOINTS = API_ENDPOINTS;

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(endpoint, mergedOptions);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

window.apiCall = apiCall;
