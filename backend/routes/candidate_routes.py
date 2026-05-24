from fastapi import APIRouter

from pydantic import BaseModel

from database.queries import save_candidate

router = APIRouter()

# -----------------------------------
# REQUEST MODEL
# -----------------------------------
class CandidateRequest(BaseModel):

    name: str

    email: str

    role: str

    tech_stack: str

    experience: str

    resume_text: str

# -----------------------------------
# SAVE CANDIDATE
# -----------------------------------
@router.post("/save-candidate")

def create_candidate(

    data: CandidateRequest
):

    candidate = save_candidate(

        data.dict()
    )

    return {

        "message":
            "Candidate saved successfully 😎🔥",

        "candidate_id":
            candidate.id
    }