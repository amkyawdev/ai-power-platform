/**
 * AI Engine - AI Power Platform
 */

class AIEngine {
    constructor() {
        this.apiBase = '/api';
        this.currentModel = 'gpt-4';
        this.conversationHistory = [];
        this.isGenerating = false;
    }

    // Chat with AI
    async chat(prompt, options = {}) {
        if (this.isGenerating) return;
        this.isGenerating = true;

        try {
            const response = await fetch(`${this.apiBase}/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    model: options.model || this.currentModel,
                    temperature: options.temperature || 0.7,
                    max_tokens: options.max_tokens || 4000
                })
            });
            
            if (!response.ok) throw new Error('Chat request failed');
            
            const data = await response.json();
            
            this.conversationHistory.push({ role: 'user', content: prompt });
            this.conversationHistory.push({ role: 'assistant', content: data.response });
            
            return data;
        } catch (error) {
            console.error('Chat error:', error);
            throw error;
        } finally {
            this.isGenerating = false;
        }
    }

    // Generate Image
    async generateImage(prompt, options = {}) {
        if (this.isGenerating) return;
        this.isGenerating = true;

        try {
            const response = await fetch(`${this.apiBase}/ai/image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    size: options.size || '1024x1024',
                    style: options.style || 'natural',
                    model: options.model || 'stable-diffusion'
                })
            });
            
            if (!response.ok) throw new Error('Image generation failed');
            
            return await response.json();
        } catch (error) {
            console.error('Image generation error:', error);
            throw error;
        } finally {
            this.isGenerating = false;
        }
    }

    // Generate Code
    async generateCode(prompt, language = 'python', framework = '') {
        if (this.isGenerating) return;
        this.isGenerating = true;

        try {
            const response = await fetch(`${this.apiBase}/ai/code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    language,
                    framework
                })
            });
            
            if (!response.ok) throw new Error('Code generation failed');
            
            return await response.json();
        } catch (error) {
            console.error('Code generation error:', error);
            throw error;
        } finally {
            this.isGenerating = false;
        }
    }

    // Build Website
    async buildWebsite(description, type = 'portfolio', stack = 'html') {
        if (this.isGenerating) return;
        this.isGenerating = true;

        try {
            const response = await fetch(`${this.apiBase}/ai/website`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description,
                    type,
                    stack
                })
            });
            
            if (!response.ok) throw new Error('Website build failed');
            
            return await response.json();
        } catch (error) {
            console.error('Website build error:', error);
            throw error;
        } finally {
            this.isGenerating = false;
        }
    }

    // Optimize Prompt
    async optimizePrompt(prompt, options = {}) {
        if (this.isGenerating) return;
        this.isGenerating = true;

        try {
            const response = await fetch(`${this.apiBase}/ai/prompt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    addContext: options.addContext || true,
                    addExamples: options.addExamples || true,
                    addFormat: options.addFormat || false,
                    addConstraints: options.addConstraints || false
                })
            });
            
            if (!response.ok) throw new Error('Prompt optimization failed');
            
            return await response.json();
        } catch (error) {
            console.error('Prompt optimization error:', error);
            throw error;
        } finally {
            this.isGenerating = false;
        }
    }

    // Clear conversation
    clearHistory() {
        this.conversationHistory = [];
    }

    // Demo mode responses (when API is not available)
    getDemoResponse(type, prompt) {
        const responses = {
            chat: "I'm an AI assistant powered by advanced language models. I can help you with coding, creative writing, analysis, and much more. What would you like to explore today?",
            
            image: "https://via.placeholder.com/1024x1024/1a1a2e/00f0ff?text=AI+Generated+Image",
            
            code: `def fibonacci(n, memo={}):
    """Calculate fibonacci number with memoization"""
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]

# Example usage
if __name__ == "__main__":
    print(fibonacci(10))  # Output: 55`,
            
            website: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #0a0a0f;
            color: #fff;
            margin: 0;
            padding: 0;
        }
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #00f0ff, #7b2cbf);
        }
        h1 { font-size: 3rem; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>Welcome to My Portfolio</h1>
    </div>
</body>
</html>`,
            
            prompt: `Based on your input, here's an optimized prompt:

Context: You are an expert AI assistant with extensive knowledge in technology, programming, and creative writing.

Task: ${prompt}

Please provide a comprehensive, well-structured response with:
1. Clear explanations
2. Practical examples where applicable
3. Actionable insights

Constraints:
- Keep the response focused and concise
- Use professional tone
- Prioritize accuracy and relevance`
        };
        
        return responses[type] || responses.chat;
    }
}

// UI Handlers for AI Tools
class AIUI {
    constructor(engine) {
        this.engine = engine;
        this.init();
    }

    init() {
        this.setupChat();
        this.setupImage();
        this.setupCode();
        this.setupWebsite();
        this.setupPrompt();
    }

    setupChat() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendChatBtn');
        const messagesContainer = document.getElementById('chatMessages') || document.getElementById('chatHistory');

        if (!chatInput || !messagesContainer) return;

        const sendMessage = async () => {
            const prompt = chatInput.value.trim();
            if (!prompt) return;

            // Add user message
            this.addMessage(messagesContainer, 'user', prompt);
            chatInput.value = '';

            // Show typing indicator
            const typingMsg = this.addMessage(messagesContainer, 'bot', 'Thinking...');

            try {
                const response = await this.engine.chat(prompt);
                typingMsg.remove();
                this.addMessage(messagesContainer, 'bot', response.response || this.engine.getDemoResponse('chat', prompt));
            } catch (error) {
                typingMsg.remove();
                this.addMessage(messagesContainer, 'bot', this.engine.getDemoResponse('chat', prompt));
            }
        };

        sendBtn?.addEventListener('click', sendMessage);
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    setupImage() {
        const generateBtn = document.getElementById('generateImageBtn');
        const promptInput = document.getElementById('imagePrompt');
        const output = document.getElementById('imageOutput');

        if (!generateBtn) return;

        generateBtn.addEventListener('click', async () => {
            const prompt = promptInput?.value.trim();
            if (!prompt) return;

            output.innerHTML = '<div class="generation-progress"><div class="progress-spinner"></div><p>Generating your image...</p></div>';

            try {
                const response = await this.engine.generateImage(prompt);
                output.innerHTML = `<img src="${response.url || this.engine.getDemoResponse('image', prompt)}" alt="Generated Image" style="width:100%;border-radius:12px;">`;
            } catch (error) {
                output.innerHTML = `<img src="${this.engine.getDemoResponse('image', prompt)}" alt="Generated Image" style="width:100%;border-radius:12px;">`;
            }
        });
    }

    setupCode() {
        const generateBtn = document.getElementById('generateCodeBtn');
        const promptInput = document.getElementById('codePrompt');
        const codeBlock = document.getElementById('codeBlock');
        const fileName = document.getElementById('fileName');

        if (!generateBtn) return;

        generateBtn.addEventListener('click', async () => {
            const prompt = promptInput?.value.trim();
            const language = document.getElementById('codeLanguage')?.value || 'python';
            
            if (!prompt) return;

            codeBlock.textContent = '// Generating code...';

            try {
                const response = await this.engine.generateCode(prompt, language);
                codeBlock.textContent = response.code || this.engine.getDemoResponse('code', prompt);
                if (fileName) {
                    fileName.textContent = `main.${language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : language}`;
                }
            } catch (error) {
                codeBlock.textContent = this.engine.getDemoResponse('code', prompt);
            }
        });
    }

    setupWebsite() {
        const generateBtn = document.getElementById('generateWebsiteBtn');
        const promptInput = document.getElementById('websitePrompt');
        const iframe = document.getElementById('websiteFrame');

        if (!generateBtn) return;

        generateBtn.addEventListener('click', async () => {
            const prompt = promptInput?.value.trim();
            if (!prompt) return;

            try {
                const response = await this.engine.buildWebsite(prompt);
                if (iframe) {
                    iframe.srcdoc = response.html || this.engine.getDemoResponse('website', prompt);
                }
            } catch (error) {
                if (iframe) {
                    iframe.srcdoc = this.engine.getDemoResponse('website', prompt);
                }
            }
        });
    }

    setupPrompt() {
        const optimizeBtn = document.getElementById('optimizePromptBtn');
        const promptInput = document.getElementById('promptInput');
        const optimizedPrompt = document.getElementById('optimizedPrompt');

        if (!optimizeBtn) return;

        optimizeBtn.addEventListener('click', async () => {
            const prompt = promptInput?.value.trim();
            if (!prompt) return;

            const options = {
                addContext: document.getElementById('addContext')?.checked || true,
                addExamples: document.getElementById('addExamples')?.checked || true,
                addFormat: document.getElementById('addFormat')?.checked || false,
                addConstraints: document.getElementById('addConstraints')?.checked || false
            };

            try {
                const response = await this.engine.optimizePrompt(prompt, options);
                optimizedPrompt.textContent = response.optimized || this.engine.getDemoResponse('prompt', prompt);
            } catch (error) {
                optimizedPrompt.textContent = this.engine.getDemoResponse('prompt', prompt);
            }
        });
    }

    addMessage(container, role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${role === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
        return messageDiv;
    }
}

// Global instances
window.aiEngine = new AIEngine();
window.aiUI = null;

// Initialize AI UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiUI = new AIUI(window.aiEngine);
});
