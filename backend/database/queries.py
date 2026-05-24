from database.db import SessionLocal

from database.models import Candidate

# -----------------------------------
# SAVE CANDIDATE
# -----------------------------------
def save_candidate(data):

    db = SessionLocal()

    candidate = Candidate(

        name=data.get("name"),

        email=data.get("email"),

        role=data.get("role"),

        tech_stack=data.get("tech_stack"),

        experience=data.get("experience"),

        resume_text=data.get("resume_text")
    )

    db.add(candidate)

    db.commit()

    db.refresh(candidate)

    db.close()

    return candidate
from database.models import Interview

# -----------------------------------
# SAVE INTERVIEW
# -----------------------------------
from database.db import SessionLocal

from database.models import Interview

# -----------------------------------
# SAVE INTERVIEW
# -----------------------------------
def save_interview(data):

    db = SessionLocal()

    try:

        new_interview = Interview(

            candidate_name=
                data.get("candidate_name"),

            role=
                data.get("role"),

            ats_score=
                str(data.get("ats_score")),

            evaluation=
                str(data.get("evaluation"))
        )

        db.add(new_interview)

        db.commit()

        db.refresh(new_interview)

        return new_interview

    finally:

        db.close()
# -----------------------------------
# GET ALL INTERVIEWS
# -----------------------------------
def get_all_interviews():

    db = SessionLocal()

    interviews = db.query(

        Interview

    ).all()

    db.close()

    return interviews