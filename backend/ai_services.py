import os
import json
import aiohttp
from openai import AsyncOpenAI
from typing import Optional

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-proj_G399ihsLo27hoxdPn7oZbsZB")
STABILITY_KEY = os.getenv("STABILITY_KEY", "sk-YXUmahYEKugjFDA7QIOsU8Hu3TAtnz5KBelBkofAyZDHVCFR")
ZAI_API_KEY = os.getenv("ZAI_API_KEY", "1bc5b90cb5bc4ab280cd7aec063a7779.u8xSSqC2BJea0pR0")

client = AsyncOpenAI(api_key=OPENAI_API_KEY)

async def chat_with_ai(prompt: str, model: str = "gpt-4") -> str:
    """Chat with OpenAI GPT models"""
    try:
        response = await client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant from OneHand AI Platform."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=2000
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

async def generate_image(prompt: str, size: str = "1024x1024") -> Optional[str]:
    """Generate image using Stability AI or DALL-E"""
    try:
        response = await client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size=size,
            n=1
        )
        return response.data[0].url
    except Exception as e:
        # Fallback to Stability AI
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    "https://api.stability.ai/v1/generation/text-to-image",
                    headers={
                        "Authorization": f"Bearer {STABILITY_KEY}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "text_prompts": [{"text": prompt}],
                        "cfg_scale": 7,
                        "height": 1024,
                        "width": 1024,
                        "samples": 1
                    }
                ) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        return data["artifacts"][0]["base64"]
                    else:
                        return f"Error: Stability AI failed with status {resp.status}"
        except Exception as e2:
            return f"Error generating image: {str(e2)}"

async def generate_code(prompt: str, language: str = "python") -> str:
    """Generate code using OpenAI"""
    system_prompt = f"""You are an expert {language} developer. 
Generate clean, well-documented, and production-ready code based on the user's request.
Include necessary imports, error handling, and best practices."""
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            max_tokens=3000
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error generating code: {str(e)}"

async def generate_website(description: str) -> dict:
    """Generate website code using AI"""
    prompt = f"""Generate a complete, responsive website based on this description: {description}

Provide the response in this JSON format:
{{
    "html": "complete HTML code",
    "css": "complete CSS code",
    "javascript": "complete JavaScript code (optional)",
    "components": ["list of main components"]
}}
Make it modern, responsive, and use a dark cyber/AI theme."""

    try:
        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert web developer. Generate complete, production-ready code."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=4000
        )
        
        content = response.choices[0].message.content
        try:
            return json.loads(content)
        except:
            return {"html": content, "css": "", "javascript": "", "error": "Could not parse response"}
    except Exception as e:
        return {"error": str(e)}

async def optimize_prompt(prompt: str, prompt_type: str = "general") -> str:
    """Optimize and enhance prompts for better AI results"""
    system_prompt = f"""You are an expert prompt engineer. Optimize the user's prompt for better AI results.
The prompt type is: {prompt_type}

For different types:
- image: Add artistic details, lighting, composition, style
- code: Add requirements, constraints, edge cases
- general: Make it clear, specific, and detailed

Return only the optimized prompt without explanations."""

    try:
        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error optimizing prompt: {str(e)}"