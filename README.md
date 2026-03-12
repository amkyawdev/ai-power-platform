# AI Power Platform 🚀

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/Three.js-WebGL-orange.svg" alt="WebGL">
  <img src="https://img.shields.io/badge/Firebase-Auth-yellow.svg" alt="Firebase">
</p>

A futuristic AI Power Platform built with cutting-edge web technologies. Create, build, and automate with the power of artificial intelligence.

![AI Power Platform](https://via.placeholder.com/1200x600/0a0a0f/00f0ff?text=AI+Power+Platform)

## ✨ Features

### 🤖 AI Tools
- **AI Chat** - Intelligent conversations with advanced language models
- **AI Image Generator** - Create stunning images from text descriptions
- **AI Code Generator** - Generate clean, efficient code in any language
- **AI Website Builder** - Build complete websites from descriptions
- **AI Prompt Studio** - Optimize and refine your AI prompts
- **Project Manager** - Organize and manage your AI projects

### 🎨 Design
- Futuristic dark theme with glassmorphism UI
- 3D WebGL animated backgrounds (galaxy, particles, neural network)
- Smooth GSAP animations
- Floating elements and neural network visualization
- Cyber AI aesthetic

### 🔧 Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js WebGL
- **Animations**: GSAP, CSS Animations
- **Authentication**: Firebase Auth (Google, Email)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (Neon)

## 📁 Project Structure

```
ai-power-platform/
├── index.html              # Landing page
├── dashboard.html          # User dashboard
├── ai_studio.html          # AI workspace
│
├── css/
│   ├── main.css           # Core styles
│   ├── dashboard.css      # Dashboard styles
│   ├── ai.css             # AI studio styles
│   └── animations.css     # Animation keyframes
│
├── js/
│   ├── app.js             # Main app logic
│   ├── router.js          # SPA navigation
│   ├── ai_engine.js       # AI API integration
│   ├── firebase_auth.js   # Authentication
│   └── ui_effects.js      # UI interactions
│
├── webgl/
│   ├── webgl_scene.js     # Main 3D scene
│   ├── galaxy_background.js # Galaxy animation
│   └── particle_network.js  # Neural network effect
│
├── components/
│   ├── navbar.js          # Navigation
│   ├── sidebar.js         # Dashboard sidebar
│   ├── ai_card.js         # AI tool cards
│   └── modal.js           # Modal dialogs
│
├── config/
│   ├── firebase.js        # Firebase config
│   └── api_config.js      # API endpoints
│
├── assets/
│   ├── icons/             # Icon assets
│   ├── images/            # Image assets
│   └── models/            # 3D models
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for development)
- Python 3.8+ (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amkyawdev/ai-power-platform.git
   cd ai-power-platform
   ```

2. **Open in Browser**
   Simply open `index.html` in your browser, or use a local server:

   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. **Access the application**
   Open `http://localhost:8000` in your browser

### Backend Setup (Optional)

If you want to connect to a real backend:

```bash
cd backend
pip install -r requirements.txt
python main.py
```

## 🎯 Usage

### Landing Page
- View featured AI tools
- Learn about platform capabilities
- Sign in or register

### Dashboard
- Access all AI tools from sidebar
- View recent activity
- Manage projects

### AI Studio
- Select AI tool from tabs
- Enter your prompt
- Get AI-generated results

## 🔐 Authentication

The platform supports:
- **Google Sign-In** - One-click Google authentication
- **Email/Password** - Traditional email registration
- **Demo Mode** - Try without authentication

## 🎨 Customization

### Colors
Edit CSS variables in `css/main.css`:
```css
:root {
    --primary: #00f0ff;
    --secondary: #7b2cbf;
    --accent: #ff006e;
    --dark: #0a0a0f;
}
```

### WebGL Effects
Choose from different background effects in `webgl/`:
- Galaxy background
- Particle network
- Custom 3D scenes

## 🔜 Future Features

- [ ] AI Agents - Autonomous AI assistants
- [ ] AI Automation Tools - Workflow automation
- [ ] Voice AI - Speech-to-text and text-to-speech
- [ ] Realtime Collaboration - Team workspace
- [ ] 3D AI Workspace - Immersive AI environment
- [ ] Plugin System - Extend functionality
- [ ] API Access - Developer API

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) - 3D graphics library
- [GSAP](https://greensock.com/gsap/) - Animation platform
- [Firebase](https://firebase.google.com/) - Authentication & database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/amkyawdev">Aung Myo Kyaw</a>
</p>
