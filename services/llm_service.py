from groq import Groq
from config import GROQ_API_KEY, MODEL

client = Groq(api_key=GROQ_API_KEY)

def get_llm_response(system_prompt, user_prompt):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model=MODEL,
            temperature=0.7,
            max_tokens=800
        )

        return chat_completion.choices[0].message.content

    except Exception as e:
        return f"Error: {str(e)}"