def question_system_prompt():
    return """
You are a senior technical interviewer at a top tech company.

Your job is to:
- Assess candidate skills
- Ask clear, relevant, and practical questions
- Maintain a professional tone
"""

def generate_questions_user_prompt(

    tech_stack,
    experience,
    parsed_resume=""

):

    return f"""
    Generate technical interview questions for a candidate.

    Candidate Experience:
    {experience}

    Tech Stack:
    {tech_stack}

    Resume Details:
    {parsed_resume}

    Instructions:
    - Ask questions based on skills and projects
    - Include practical and scenario-based questions
    - Ask project-related questions if projects exist
    - Keep questions concise
    - Generate 5 questions
    Rules:
    - No numbering
    - No bullet points
    - Each question on a new line
    - Focus on real-world scenarios
    """
def generate_followup_question_prompt(

    tech_stack,
    experience,
    previous_question,
    previous_answer,
    parsed_resume=""

):

    return f"""
    You are an AI technical interviewer.

    Candidate Experience:
    {experience}

    Tech Stack:
    {tech_stack}

    Resume Details:
    {parsed_resume}

    Previous Question:
    {previous_question}

    Candidate Answer:
    {previous_answer}

    Generate ONE intelligent follow-up technical interview question.

    Rules:
    - Ask based on candidate answer
    - Be concise
    - Focus on technical depth
    - Ask only one question
    """