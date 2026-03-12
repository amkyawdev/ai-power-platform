# OneHand AI - Advanced AI Power Platform

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/Python-FastAPI-green.svg" alt="Python">
  <img src="https://img.shields.io/badge/Frontend-TailwindCSS-purple.svg" alt="Tailwind">
  <img src="https://img.shields.io/badge/3D-Three.js-orange.svg" alt="Three.js">
</p>

> 🚀 Advanced AI Power Platform with Chat, Image Generation, Code Generation, Website Builder, Prompt Studio, and Project Manager

## ✨ Features

- **AI Chat** - Advanced conversational AI powered by GPT-4
- **AI Image Generator** - Create stunning images from text descriptions using DALL-E 3
- **AI Code Generator** - Generate clean, optimized code in any programming language
- **AI Website Builder** - Build complete websites from simple descriptions in seconds
- **AI Prompt Studio** - Optimize and enhance your prompts for better AI results
- **Project Manager** - Organize and manage all your AI projects in one place

## 🛠️ Tech Stack

### Backend
- **Python** - FastAPI REST API
- **PostgreSQL** - Neon Database
- **OpenAI** - GPT-4 Integration
- **Firebase Admin** - Authentication

### Frontend
- **HTML/CSS** - TailwindCSS
- **JavaScript** - Three.js WebGL
- **GSAP** - Smooth animations
- **Firebase Client** - Authentication

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js (optional, for development)
- Neon PostgreSQL Database
- OpenAI API Key
- Firebase Project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-power-platform.git
   cd ai-power-platform
   ```

2. **Set up virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

5. **Run the backend server**
   ```bash
   python main.py
   # or
   uvicorn main:app --reload
   ```

6. **Access the application**
   Open your browser and navigate to: `http://localhost:8000`

## 📁 Project Structure

```
ai-power-platform/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Neon PostgreSQL connection
│   ├── models.py            # Pydantic models
│   ├── ai_services.py       # AI API integrations
│   ├── auth.py              # Firebase authentication
│   ├── routes/
│   │   ├── ai_routes.py     # AI endpoints
│   │   ├── user_routes.py   # User endpoints
│   │   └── project_routes.py # Project endpoints
│   └── requirements.txt
│
├── frontend/
│   ├── index.html           # Landing page
│   ├── dashboard.html       # User dashboard
│   ├── ai_studio.html       # AI tools interface
│   ├── js/
│   │   ├── app.js           # Main application
│   │   ├── ai.js            # AI functionality
│   │   └── webgl_scene.js   # WebGL scene
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── assets/
│       ├── icons            # Icon assets
│       └── models           # 3D models
│
├── webgl/
│   ├── scene.js             # Neural network visualization
│   ├── galaxy.js            # Galaxy visualization
│   └── shaders/             # WebGL shaders
│
├── config/
│   ├── firebase.js          # Firebase configuration
│   └── env_loader.py        # Environment loader
│
└── .env                     # Environment variables
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following:

```env
# Database
DATABASE_URL=postgresql://...

# AI API Keys
OPENAI_API_KEY=sk-...
STABILITY_KEY=sk-...
ZAI_API_KEY=...

# Firebase
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
```

## 🌐 Deployment

### Vercel (Frontend + Serverless)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway deploy
```

### Render

```bash
# Deploy using render.yaml
render deploy
```

### GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

## 🔐 Authentication

The platform supports:
- **Google Sign-In** - One-click Google authentication
- **Email/Password** - Traditional email login
- **Firebase Auth** - Secure token-based authentication

## 🎨 Design Features

- **Futuristic WebGL Interface** - Animated neural network background
- **Floating 3D AI Elements** - Dynamic 3D geometric shapes
- **Animated Neural Network** - Interactive particle system
- **Smooth GSAP Animations** - Professional transition effects
- **Dark AI Cyber Theme** - Modern dark interface with neon accents
- **Glassmorphism UI** - Modern frosted glass design

## 📱 Pages

1. **Landing Page** (`index.html`) - Hero section, features, CTA
2. **Dashboard** (`dashboard.html`) - User dashboard, stats, quick access
3. **AI Studio** (`ai_studio.html`) - All AI tools in one place
4. **User Profile** - Account settings and preferences
5. **Project Manager** - Create and manage projects

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) - AI models
- [Firebase](https://firebase.google.com/) - Authentication
- [Three.js](https://threejs.org/) - 3D graphics
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Neon](https://neon.tech/) - Database

---

<p align="center">Made with ❤️ by OneHand AI</p>