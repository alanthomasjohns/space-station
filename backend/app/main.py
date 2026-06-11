from fastapi import FastAPI
from backend.app.api.satellites import router as satellite_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Space Station API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Space Station API is running"}


app.include_router(satellite_router)