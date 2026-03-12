from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models import ProjectCreate, ProjectResponse
from auth import verify_firebase_token
from database import get_pool

router = APIRouter()

async def get_current_user(token_data: dict = Depends(verify_firebase_token)):
    return token_data

@router.post("/")
async def create_project(
    project: ProjectCreate, 
    token_data: dict = Depends(get_current_user)
):
    """Create a new project"""
    pool = await get_pool()
    async with pool.acquire() as conn:
        # Get user ID from firebase_uid
        user = await conn.fetchrow(
            "SELECT id FROM users WHERE firebase_uid = $1",
            token_data["uid"]
        )
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        project_id = await conn.fetchval(
            "INSERT INTO projects (user_id, name, type) VALUES ($1, $2, $3) RETURNING id",
            user["id"], project.name, project.type
        )
        
        result = await conn.fetchrow(
            "SELECT * FROM projects WHERE id = $1",
            project_id
        )
    
    return dict(result)

@router.get("/")
async def get_projects(token_data: dict = Depends(get_current_user)):
    """Get all projects for current user"""
    pool = await get_pool()
    async with pool.acquire() as conn:
        user = await conn.fetchrow(
            "SELECT id FROM users WHERE firebase_uid = $1",
            token_data["uid"]
        )
        
        if not user:
            return []
        
        projects = await conn.fetch(
            "SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC",
            user["id"]
        )
    
    return [dict(project) for project in projects]

@router.get("/{project_id}")
async def get_project(project_id: int, token_data: dict = Depends(get_current_user)):
    """Get a specific project"""
    pool = await get_pool()
    async with pool.acquire() as conn:
        user = await conn.fetchrow(
            "SELECT id FROM users WHERE firebase_uid = $1",
            token_data["uid"]
        )
        
        project = await conn.fetchrow(
            "SELECT * FROM projects WHERE id = $1 AND user_id = $2",
            project_id, user["id"]
        )
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return dict(project)

@router.delete("/{project_id}")
async def delete_project(project_id: int, token_data: dict = Depends(get_current_user)):
    """Delete a project"""
    pool = await get_pool()
    async with pool.acquire() as conn:
        user = await conn.fetchrow(
            "SELECT id FROM users WHERE firebase_uid = $1",
            token_data["uid"]
        )
        
        result = await conn.execute(
            "DELETE FROM projects WHERE id = $1 AND user_id = $2",
            project_id, user["id"]
        )
    
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {"message": "Project deleted successfully"}