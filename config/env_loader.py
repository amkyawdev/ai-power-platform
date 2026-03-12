import os
from dotenv import load_dotenv

load_dotenv()

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://neondb_owner:npg_nDCUZOt3e1qG@ep-hidden-recipe-ahojuuib-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

# AI API Keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-proj_G399ihsLo27hoxdPn7oZbsZB")
STABILITY_KEY = os.getenv("STABILITY_KEY", "sk-YXUmahYEKugjFDA7QIOsU8Hu3TAtnz5KBelBkofAyZDHVCFR")
ZAI_API_KEY = os.getenv("ZAI_API_KEY", "1bc5b90cb5bc4ab280cd7aec063a7779.u8xSSqC2BJea0pR0")

# Firebase
FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY", "AIzaSyA5BS_7xfD1-VhGYlBfkKLBkHUKnkZXBsg")
FIREBASE_AUTH_DOMAIN = os.getenv("FIREBASE_AUTH_DOMAIN", "amkyawdev.firebaseapp.com")
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID", "amkyawdev")
FIREBASE_STORAGE_BUCKET = os.getenv("FIREBASE_STORAGE_BUCKET", "amkyawdev.firebasestorage.app")
FIREBASE_MESSAGING_SENDER_ID = os.getenv("FIREBASE_MESSAGING_SENDER_ID", "242883286611")
FIREBASE_APP_ID = os.getenv("FIREBASE_APP_ID", "1:242883286611:web:a61ea6d9d294c49b0618a6")
FIREBASE_MEASUREMENT_ID = os.getenv("FIREBASE_MEASUREMENT_ID", "G-VF8XVGCWM2")

# App Config
APP_NAME = os.getenv("APP_NAME", "OneHand AI")
APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
DEBUG = os.getenv("DEBUG", "True").lower() == "true"

# Server
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

def get_config():
    return {
        "database_url": DATABASE_URL,
        "openai_api_key": OPENAI_API_KEY,
        "stability_key": STABILITY_KEY,
        "zai_api_key": ZAI_API_KEY,
        "firebase_config": {
            "apiKey": FIREBASE_API_KEY,
            "authDomain": FIREBASE_AUTH_DOMAIN,
            "projectId": FIREBASE_PROJECT_ID,
            "storageBucket": FIREBASE_STORAGE_BUCKET,
            "messagingSenderId": FIREBASE_MESSAGING_SENDER_ID,
            "appId": FIREBASE_APP_ID,
            "measurementId": FIREBASE_MEASUREMENT_ID
        },
        "app_name": APP_NAME,
        "app_version": APP_VERSION,
        "debug": DEBUG,
        "host": HOST,
        "port": PORT
    }

if __name__ == "__main__":
    config = get_config()
    print(f"Loaded configuration for {config['app_name']} v{config['app_version']}")
    print(f"Debug mode: {config['debug']}")
    print(f"Database: {config['database_url'][:50]}...")