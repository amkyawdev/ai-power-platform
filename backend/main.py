from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from routes import ai_routes, user_routes, project_routes
from database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="OneHand AI Platform",
    description="Advanced AI Power Platform with Chat, Image Generation, Code Generation, Website Builder, Prompt Studio, and Project Manager",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_routes.router, prefix="/api/ai", tags=["AI"])
app.include_router(user_routes.router, prefix="/api/users", tags=["Users"])
app.include_router(project_routes.router, prefix="/api/projects", tags=["Projects"])

frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "OneHand AI Platform"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)