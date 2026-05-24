from fastapi import APIRouter

import sqlite3

import asyncio

from email_service import send_interview_email

from services.llm_service import get_llm_response

router = APIRouter()

# -----------------------------------
# GENERATE FOLLOW-UP QUESTION
# -----------------------------------
@router.post("/generate-question")

async def generate_question(data: dict):

    tech_stack = data.get(

        "tech_stack",

        ""
    )

    experience = data.get(

        "experience",

        ""
    )

    question = data.get(

        "question",

        ""
    )

    answer = data.get(

        "answer",

        ""
    )

    # -----------------------------------
    # FOLLOW-UP PROMPT
    # -----------------------------------
    prompt = f"""

Candidate Tech Stack:
{tech_stack}

Candidate Experience:
{experience}

Previous Interview Question:
{question}

Candidate Answer:
{answer}

Your task:
- Analyze the candidate's answer carefully.
- Ask ONE intelligent follow-up technical interview question.
- The next question MUST relate to the candidate’s previous answer.
- Keep the interview conversational and adaptive.
- Avoid generic repeated questions.
- Ask concise technical questions only.
- Ask only ONE question.

"""

    # -----------------------------------
    # AI RESPONSE
    # -----------------------------------
    next_question = get_llm_response(

        "You are an expert AI technical interviewer.",

        prompt
    )

    return {

        "question":

        next_question
    }

# -----------------------------------
# EVALUATE INTERVIEW
# -----------------------------------
@router.post("/evaluate-interview")

async def evaluate_interview(data: dict):

    questions = data.get(

        "questions",

        []
    )

    answers = data.get(

        "answers",

        []
    )

    tech_stack = data.get(

        "tech_stack",

        ""
    )

    # -----------------------------------
    # BUILD QA FORMAT
    # -----------------------------------
    qa_text = ""

    for q, a in zip(

        questions,

        answers
    ):

        qa_text += f"""

Question:
{q}

Answer:
{a}

"""

    # -----------------------------------
    # EVALUATION PROMPT
    # -----------------------------------
    prompt = f"""

Candidate Tech Stack:
{tech_stack}

Interview Questions and Answers:
{qa_text}

Evaluate the interview professionally.

Provide:

1. Technical Skills Evaluation
2. Communication Skills
3. Strengths
4. Weaknesses
5. Final Hiring Recommendation

Keep the evaluation concise and professional.

"""

    # -----------------------------------
    # AI EVALUATION
    # -----------------------------------
    evaluation = get_llm_response(

        "You are an expert AI interviewer.",

        prompt
    )

    return {

        "evaluation":

        evaluation
    }

# -----------------------------------
# SAVE INTERVIEW
# -----------------------------------
@router.post("/save-interview")

async def save_interview(data: dict):

    conn = sqlite3.connect("hirely.db")

    cursor = conn.cursor()

    cursor.execute(

        """
        INSERT INTO interviews (

            candidate_name,

            role,

            ats_score,

            evaluation

        )

        VALUES (?, ?, ?, ?)
        """,

        (

            data["candidate_name"],

            data["role"],

            data["ats_score"],

            data["evaluation"]
        )
    )

    conn.commit()

    conn.close()

    # -----------------------------------
    # SEND EMAIL
    # -----------------------------------
    asyncio.create_task(

        send_interview_email(

            data["candidate_email"],

            data["candidate_name"],

            data["role"],

            data["evaluation"]
        )
    )

    return {

        "message":

        "Interview saved"
    }

# -----------------------------------
# GET INTERVIEWS
# -----------------------------------
@router.get("/get-interviews")

def get_interviews():

    conn = sqlite3.connect("hirely.db")

    cursor = conn.cursor()

    cursor.execute(

        "SELECT * FROM interviews"
    )

    interviews = cursor.fetchall()

    conn.close()

    formatted = []

    for item in interviews:

        formatted.append({

            "id": item[0],

            "candidate_name": item[1],

            "role": item[2],

            "ats_score": item[3],

            "evaluation": item[4]
        })

    return {

        "interviews":

        formatted
    }

# -----------------------------------
# CLEAR INTERVIEWS
# -----------------------------------
@router.delete("/clear-interviews")

def clear_interviews():

    conn = sqlite3.connect("hirely.db")

    cursor = conn.cursor()

    cursor.execute(

        "DELETE FROM interviews"
    )

    conn.commit()

    conn.close()

    return {

        "message":

        "All interviews deleted"
    }