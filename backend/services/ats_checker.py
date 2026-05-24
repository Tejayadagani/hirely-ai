from services.llm_service import (
    get_llm_response
)

import json

import re


# -----------------------------------
# ATS SCORE CALCULATOR
# -----------------------------------
def calculate_ats_score(

    resume_text,

    role,

    tech_stack
):

    prompt = f"""

You are an expert ATS evaluator.

Analyze this resume against the job role and tech stack.

Resume:
{resume_text}

Role:
{role}

Tech Stack:
{tech_stack}

Provide:

1. ATS match score out of 100
2. Matching skills
3. Missing skills
4. Professional ATS summary

Return ONLY valid JSON.

Format:

{{
    "ats_score": 85,
    "matched_skills": [],
    "missing_skills": [],
    "summary": ""
}}

"""

    response = get_llm_response(

        "You are an expert ATS evaluator.",

        prompt
    )

    try:

        clean_response = re.sub(

            r"```json|```",

            "",

            response
        ).strip()

        result = json.loads(
            clean_response
        )

        return result

    except Exception as e:

        print(

            "ATS Parsing Error:",

            e
        )

        return {

            "ats_score": 0,

            "matched_skills": [],

            "missing_skills": [],

            "summary":

            "ATS evaluation failed."
        }