from fastapi import FastAPI
from routes.evaluation_routes import (
    router as evaluation_router
)
from starlette.middleware.cors import CORSMiddleware
from routes.interview_routes import (
    router as interview_router
)
from routes.resume_routes import (
    router as resume_router
)
from database.db import engine
from routes.interview_save_routes import (

    router as interview_save_router
)
from database.models import Base
from routes.candidate_routes import (

    router as candidate_router
)
from routes.dashboard_routes import (

    router as dashboard_router
)

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

Base.metadata.create_all(bind=engine)
app.include_router(resume_router)
app.include_router(evaluation_router)
app.include_router(interview_router)
app.include_router(candidate_router)
app.include_router(interview_save_router)
app.include_router(dashboard_router)
@app.get("/")

def home():

    return {
        "message": "Hirely AI Backend Running 🚀"
    }