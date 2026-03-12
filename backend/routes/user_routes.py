from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from models import UserCreate, UserResponse
from auth import verify_firebase_token, create_user_if_not_exists
from database import get_pool

router = APIRouter()

async def get_current_user(token_data: dict = Depends(verify_firebase_token)):
    return token_data

@router.post("/register")
async def register_user(user_data: UserCreate, token_data: dict = Depends(get_current_user)):
    """Register a new user or get existing user"""
    pool = await get_pool()
    user = await create_user_if_not_exists(
        user_data.firebase_uid,
        user_data.email,
        user_data.username,
        pool
    )
    return user

@router.get("/me")
async def get_current_user_info(token_data: dict = Depends(get_current_user)):
    """Get current user info"""
    pool = await get_pool()
    async with pool.acquire() as conn:
        user = await conn.fetchrow(
            "SELECT * FROM users WHERE firebase_uid = $1",
            token_data["uid"]
        )
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return dict(user)

@router.get("/{firebase_uid}")
async def get_user_by_firebase_uid(firebase_uid: str, token_data: dict = Depends(get_current_user)):
    """Get user by Firebase UID"""
    pool = await get_pool()
    async with pool.acquire() as conn:
        user = await conn.fetchrow(
            "SELECT * FROM users WHERE firebase_uid = $1",
            firebase_uid
        )
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return dict(user)