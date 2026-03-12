#!/usr/bin/env python3
"""
OneHand AI Platform - Run Script
Simple launcher for the AI Power Platform
"""

import os
import sys
import subprocess

def main():
    print("🚀 Starting OneHand AI Platform...")
    print("=" * 50)
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        sys.exit(1)
    
    # Check if backend dependencies are installed
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    requirements_file = os.path.join(backend_dir, 'requirements.txt')
    
    print("\n📦 Checking dependencies...")
    
    try:
        import asyncpg
        import fastapi
        import uvicorn
        print("✅ All dependencies are installed")
    except ImportError:
        print("⚠️  Some dependencies are missing")
        print("Installing dependencies...")
        
        # Install dependencies
        subprocess.run([
            sys.executable, '-m', 'pip', 'install', '-r', requirements_file
        ], cwd=backend_dir)
    
    print("\n🌐 Starting server...")
    print("Open your browser to: http://localhost:8000")
    print("=" * 50)
    
    # Run the FastAPI server
    os.chdir(backend_dir)
    subprocess.run([sys.executable, 'main.py'])

if __name__ == "__main__":
    main()