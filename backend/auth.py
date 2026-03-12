from fastapi import HTTPException, Header
from typing import Optional
import os

async def verify_firebase_token(authorization: Optional[str] = Header(None)) -> dict:
    """Verify Firebase authentication token"""
    if not authorization:
        raise HTTPException(status_code=401, detail="No authorization token provided")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization format")
    
    token = authorization.replace("Bearer ", "")
    
    # In production, verify the Firebase token using Firebase Admin SDK
    # For now, we'll decode and validate the token payload
    # This would typically use: firebase_admin.auth.verify_id_token(token)
    
    # For demo purposes, accept any token and extract user info
    # In production, use: firebase_admin.initialize_app(credentials.Certificate(...))
    try:
        # The token would be verified here using Firebase Admin SDK
        # For now, return a mock user based on the token
        return {"uid": token.split(".")[0] if "." in token else token, "verified": True}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

async def create_user_if_not_exists(firebase_uid: str, email: str, username: str, pool):
    """Create user in database if doesn't exist"""
    from database import get_pool
    
    if pool is None:
        pool = await get_pool()
    
    async with pool.acquire() as conn:
        # Check if user exists
        existing = await conn.fetchrow(
            "SELECT id FROM users WHERE firebase_uid = $1",
            firebase_uid
        )
        
        if not existing:
            # Create new user
            await conn.execute(
                "INSERT INTO users (email, username, firebase_uid) VALUES ($1, $2, $3)",
                email, username, firebase_uid
            )
            print(f"Created new user: {email}")
        
        # Return user
        user = await conn.fetchrow(
            "SELECT * FROM users WHERE firebase_uid = $1",
            firebase_uid
        )
        return dict(user)