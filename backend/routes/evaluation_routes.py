from fastapi import APIRouter

from pydantic import BaseModel

from services.ats_checker import (
    calculate_ats_score
)

router = APIRouter()

# ------------------------------
# ATS REQUEST MODEL
# ------------------------------
class ATSRequest(BaseModel):

    resume_text: str

    role: str

    tech_stack: str

# ------------------------------
# EVALUATION REQUEST MODEL
# ------------------------------
class EvaluationRequest(BaseModel):

    questions: list

    answers: list

    tech_stack: str

# ------------------------------
# ATS SCORE API
# ------------------------------
@router.post("/ats-score")

def ats_score(data: ATSRequest):

    result = calculate_ats_score(

        data.resume_text,

        data.role,

        data.tech_stack
    )

    return {

        "result": result
    }

# ------------------------------
# INTERVIEW EVALUATION API
# ------------------------------
@router.post("/evaluate-interview")

def evaluate_interview(data: EvaluationRequest):

    from services.llm_service import (
        get_llm_response
    )

    prompt = f"""

You are an AI technical interviewer.

Evaluate the candidate based on:

Questions:
{data.questions}

Answers:
{data.answers}

Tech Stack:
{data.tech_stack}

Provide:

1. Technical Skills
2. Communication Skills
3. Strengths
4. Weaknesses
5. Overall Rating out of 10
Return in a clear, structured format.
"""

    try:

        evaluation = get_llm_response(

            "You are an expert technical interviewer.",

            prompt
        )

        return {

            "evaluation": evaluation
        }

    except Exception as e:

        return {

            "evaluation":

            f"Evaluation failed: {str(e)}"
        }