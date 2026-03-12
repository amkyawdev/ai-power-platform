from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from models import (
    ChatRequest, ImageRequest, CodeRequest, 
    WebsiteRequest, PromptRequest, AIRequestResponse
)
from ai_services import (
    chat_with_ai, generate_image, generate_code,
    generate_website, optimize_prompt
)
from auth import verify_firebase_token
from database import get_pool

router = APIRouter()

async def get_current_user(token_data: dict = Depends(verify_firebase_token)):
    return token_data

@router.post("/chat")
async def chat(request: ChatRequest, user: dict = Depends(get_current_user)):
    """AI Chat endpoint"""
    response = await chat_with_ai(request.message, request.model)
    
    # Save request to database
    pool = await get_pool()
    async with pool.acquire() as conn:
        await conn.execute(
            "INSERT INTO ai_requests (user_id, prompt, response, model) VALUES ($1, $2, $3, $4)",
            1, request.message, response, request.model
        )
    
    return {"response": response, "model": request.model}

@router.post("/image")
async def create_image(request: ImageRequest, user: dict = Depends(get_current_user)):
    """AI Image Generation endpoint"""
    image_url = await generate_image(request.prompt, request.size)
    
    return {
        "image_url": image_url,
        "prompt": request.prompt,
        "size": request.size
    }

@router.post("/code")
async def create_code(request: CodeRequest, user: dict = Depends(get_current_user)):
    """AI Code Generation endpoint"""
    code = await generate_code(request.prompt, request.language)
    
    return {
        "code": code,
        "language": request.language,
        "prompt": request.prompt
    }

@router.post("/website")
async def create_website(request: WebsiteRequest, user: dict = Depends(get_current_user)):
    """AI Website Builder endpoint"""
    website = await generate_website(request.description)
    
    return website

@router.post("/prompt")
async def optimize_prompt_endpoint(request: PromptRequest, user: dict = Depends(get_current_user)):
    """AI Prompt Studio endpoint"""
    optimized = await optimize_prompt(request.prompt, request.type)
    
    return {
        "original": request.prompt,
        "optimized": optimized,
        "type": request.type
    }

@router.get("/history")
async def get_history(user: dict = Depends(get_current_user)):
    """Get user's AI request history"""
    pool = await get_pool()
    async with pool.acquire() as conn:
        history = await conn.fetch(
            "SELECT * FROM ai_requests ORDER BY created_at DESC LIMIT 50"
        )
    
    return [dict(record) for record in history]