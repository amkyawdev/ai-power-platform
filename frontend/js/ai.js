// OneHand AI - AI Services JavaScript

class AIService {
    constructor() {
        this.apiBaseUrl = '/api/ai';
        this.history = [];
    }
    
    // Chat with AI
    async chat(message, model = 'gpt-4') {
        const token = localStorage.getItem('firebaseToken');
        
        const response = await fetch(`${this.apiBaseUrl}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message, model })
        });
        
        if (!response.ok) {
            throw new Error('Chat request failed');
        }
        
        const data = await response.json();
        this.history.push({ role: 'user', content: message });
        this.history.push({ role: 'assistant', content: data.response });
        
        return data.response;
    }
    
    // Generate Image
    async generateImage(prompt, size = '1024x1024') {
        const token = localStorage.getItem('firebaseToken');
        
        const response = await fetch(`${this.apiBaseUrl}/image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt, size })
        });
        
        if (!response.ok) {
            throw new Error('Image generation failed');
        }
        
        const data = await response.json();
        return data.image_url;
    }
    
    // Generate Code
    async generateCode(prompt, language = 'python') {
        const token = localStorage.getItem('firebaseToken');
        
        const response = await fetch(`${this.apiBaseUrl}/code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt, language })
        });
        
        if (!response.ok) {
            throw new Error('Code generation failed');
        }
        
        const data = await response.json();
        return data.code;
    }
    
    // Generate Website
    async generateWebsite(description) {
        const token = localStorage.getItem('firebaseToken');
        
        const response = await fetch(`${this.apiBaseUrl}/website`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ description })
        });
        
        if (!response.ok) {
            throw new Error('Website generation failed');
        }
        
        const data = await response.json();
        return data;
    }
    
    // Optimize Prompt
    async optimizePrompt(prompt, type = 'general') {
        const token = localStorage.getItem('firebaseToken');
        
        const response = await fetch(`${this.apiBaseUrl}/prompt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt, type })
        });
        
        if (!response.ok) {
            throw new Error('Prompt optimization failed');
        }
        
        const data = await response.json();
        return data.optimized;
    }
    
    // Get History
    async getHistory() {
        const token = localStorage.getItem('firebaseToken');
        
        const response = await fetch(`${this.apiBaseUrl}/history`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch history');
        }
        
        return await response.json();
    }
    
    // Clear Chat History
    clearHistory() {
        this.history = [];
    }
    
    // Format Code for Display
    formatCode(code, language) {
        const languageMap = {
            'python': 'python',
            'javascript': 'javascript',
            'typescript': 'typescript',
            'java': 'java',
            'cpp': 'cpp',
            'go': 'go',
            'rust': 'rust',
            'html': 'html'
        };
        
        const lang = languageMap[language] || 'plaintext';
        return `<pre class="language-${lang}"><code>${this.escapeHtml(code)}</code></pre>`;
    }
    
    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Create global instance
window.aiService = new AIService();

// Export
window.AIService = AIService;