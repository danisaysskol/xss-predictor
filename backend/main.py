from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os

# Load models
model_path = "xss_classifier.pkl"
vectorizer_path = "tfidf_vectorizer.pkl"

try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
except Exception as e:
    raise RuntimeError(f"Error loading model or vectorizer: {e}")

# FastAPI app
app = FastAPI()

# Update CORS middleware with your Vercel domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://xssdetector.live", 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScriptInput(BaseModel):
    sentence: str

@app.post("/predict/")
async def predict(input: ScriptInput):
    try:
        X_input = vectorizer.transform([input.sentence])
        prediction = model.predict(X_input)
        prediction_bool = bool(prediction[0])
        result = {
            "is_xss": prediction_bool,
            "message": "The given script is possibly a threat (XSS)" if prediction_bool else "The given script is safe (Non-XSS)"
        }
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add a health check endpoint
@app.get("/")
async def root():
    return {"message": "XSS Detection API is running"}