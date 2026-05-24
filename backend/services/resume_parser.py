import pdfplumber
import json
import re

from services.llm_service import (
    get_llm_response
)


# -----------------------------------
# EXTRACT TEXT FROM RESUME PDF
# -----------------------------------
def extract_resume_text(file_path):

    text = ""

    try:

        with pdfplumber.open(file_path) as pdf:

            for page in pdf.pages:

                extracted = page.extract_text()

                if extracted:

                    text += extracted + "\n"

    except Exception as e:

        print("PDF Extraction Error:", e)

    return text


# -----------------------------------
# AI RESUME ANALYSIS
# -----------------------------------
def parse_resume_with_ai(resume_text):

    prompt = f"""

You are an expert AI Resume Analyzer.

Analyze this resume professionally.

Resume:
{resume_text}

Provide:
1. Candidate Name
2. Email
3. Phone Number
4. Skills
5. Experience
6. Projects
7. Education
8. Professional Summary

Keep response clean and professional.

"""

    response = get_llm_response(

        "You are an expert AI Resume Parser.",

        prompt
    )

    return response


# -----------------------------------
# EXTRACT STRUCTURED FIELDS
# -----------------------------------
def parse_resume_fields(resume_text):

    prompt = f"""

Extract structured information from this resume.

Resume:
{resume_text}

Return ONLY valid JSON.

IMPORTANT:
- Return experience as plain text only.
- Return education as plain text only.
- Return projects as array of strings only.
- Do NOT return nested objects.
- Do NOT return arrays of objects.

Format:

{{
    "name": "",
    "email": "",
    "phone": "",
    "skills": [],
    "experience": "",
    "projects": [],
    "education": ""
}}

"""

    response = get_llm_response(

        "You are an expert AI Resume Parser.",

        prompt
    )

    try:

        clean_response = re.sub(

            r"```json|```",

            "",

            response
        ).strip()

        parsed_data = json.loads(clean_response)

        return parsed_data

    except Exception as e:

        print("Resume Parsing Error:", e)

        return {

            "name": "",

            "email": "",

            "phone": "",

            "skills": [],

            "experience": "",

            "projects": [],

            "education": ""
        }