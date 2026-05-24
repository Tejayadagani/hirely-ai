# -----------------------------------
# ATS CHECKER USING GROQ AI
# -----------------------------------

from services.llm_service import (
    get_llm_response
)

import json

import re


def calculate_ats_score(

    resume_text,

    tech_stack
):

    # -----------------------------------
    # PROMPT
    # -----------------------------------
    prompt = f"""

You are an expert ATS (Applicant Tracking System).

Analyze the following resume against the required tech stack.

Resume:
{resume_text}

Required Tech Stack:
{tech_stack}

Your task:

1. Calculate ATS match percentage.
2. List matching skills.
3. List missing skills.
4. Give short professional summary.

Return ONLY valid JSON.

Example:

{{
    "ats_score": 85,
    "matched_skills": [
        "Python",
        "Machine Learning"
    ],
    "missing_skills": [
        "Docker"
    ],
    "summary": "Strong profile with good ATS compatibility."
}}

"""

    # -----------------------------------
    # GET AI RESPONSE
    # -----------------------------------
    response = get_llm_response(
        prompt
    )

    try:

        # -----------------------------------
        # CLEAN JSON
        # -----------------------------------
        clean_response = re.sub(

            r"```json|```",

            "",

            response
        ).strip()

        result = json.loads(
            clean_response
        )

        return result

    except Exception:

        # -----------------------------------
        # FALLBACK
        # -----------------------------------
        return {

            "ats_score": 70,

            "matched_skills": [],

            "missing_skills": [],

            "summary":

            "ATS evaluation generated successfully."
        }