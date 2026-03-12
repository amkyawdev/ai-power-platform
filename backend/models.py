from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    firebase_uid: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    firebase_uid: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProjectCreate(BaseModel):
    name: str
    type: str

class ProjectResponse(BaseModel):
    id: int
    user_id: int
    name: str
    type: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class AIRequestCreate(BaseModel):
    prompt: str
    model: str

class AIRequestResponse(BaseModel):
    id: int
    user_id: int
    prompt: str
    response: Optional[str]
    model: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    message: str
    model: str = "gpt-4"

class ImageRequest(BaseModel):
    prompt: str
    size: str = "1024x1024"

class CodeRequest(BaseModel):
    prompt: str
    language: str = "python"

class WebsiteRequest(BaseModel):
    description: str

class PromptRequest(BaseModel):
    prompt: str
    type: str = "general"