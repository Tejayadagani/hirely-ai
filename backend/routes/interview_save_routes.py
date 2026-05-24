from fastapi import APIRouter

from pydantic import BaseModel

from database.queries import save_interview

router = APIRouter()

# -----------------------------------
# REQUEST MODEL
# -----------------------------------
class InterviewRequest(BaseModel):

    candidate_name: str

    role: str

    ats_score: str

    evaluation: str

# -----------------------------------
# SAVE INTERVIEW
# -----------------------------------
@router.post("/save-interview")

def create_interview(

    data: InterviewRequest
):

    interview = save_interview(

        data.dict()
    )

    return {

        "message":

            "Interview saved successfully 😎🔥",

        "interview_id":

            interview.id
    }