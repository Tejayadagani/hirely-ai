from fastapi import APIRouter

from database.queries import (

    get_all_interviews
)

router = APIRouter()

# -----------------------------------
# GET DASHBOARD DATA
# -----------------------------------
@router.get("/dashboard")

def dashboard():

    interviews = get_all_interviews()

    results = []

    for interview in interviews:

        results.append({

            "id":
                interview.id,

            "candidate_name":
                interview.candidate_name,

            "role":
                interview.role,

            "ats_score":
                interview.ats_score,

            "evaluation":
                interview.evaluation
        })

    return {

        "results": results
    }