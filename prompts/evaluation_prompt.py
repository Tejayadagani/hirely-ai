def evaluation_system_prompt():
    return """
You are a senior technical interviewer.

Your role is to evaluate candidate answers professionally and fairly.
Provide constructive feedback.
"""

def evaluation_user_prompt(qa_text):
    return f"""
Evaluate the following candidate answers:

{qa_text}

Provide: 
1. Score for each answer (out of 10)
2. Strengths
3. Weaknesses
4. Final overall rating
5. Suggestions for improvement


Keep it concise and professional and dont combine all give line by line.
"""