def question_system_prompt():
    return """
You are a senior technical interviewer at a top tech company.

Your job is to:
- Assess candidate skills
- Ask clear, relevant, and practical questions
- Maintain a professional tone
"""

def generate_questions_user_prompt(tech_stack, experience):
    return f"""
Candidate Details:
Tech Stack: {tech_stack}
Experience: {experience}

Task:
Generate exactly 5 high-quality interview questions.

Rules:
- No numbering
- No bullet points
- Each question on a new line
- Focus on real-world scenarios
"""