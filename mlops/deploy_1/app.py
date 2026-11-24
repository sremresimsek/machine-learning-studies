from fastapi import FastAPI, Request, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import pickle
from pathlib import Path
import pandas as pd
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent

main = FastAPI()
main.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")

templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

# Load only a model artifact that you trust and generated yourself.
with (BASE_DIR / "diamond_model_complete.pkl").open("rb") as f:
    saved_data = pickle.load(f)
    model = saved_data["model"]
    encoders = saved_data["encoders"]
    scaler = saved_data["scaler"]

class Diamond_Features(BaseModel):
    carat: float
    cut: str
    color: str
    clarity: str
    depth: float
    table: float
    x: float
    y: float
    z: float

@main.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@main.post("/predict")
async def predict(features: Diamond_Features):
    input_data = pd.DataFrame([features.model_dump()])

    try:
        for col in ["cut", "color", "clarity"]:
            input_data[col] = encoders[col].transform(input_data[col])
    except ValueError as exc:
        raise HTTPException(status_code=422, detail="Unsupported categorical feature value") from exc

    input_scaled = scaler.transform(input_data)
    prediction = model.predict(input_scaled)
    return {"predicted_price": float(prediction[0])}
