import json
import os

FILE_PATH = "data/candidates.json"

def format_qa(answers):
    text = ""
    for item in answers:
        text += f"Q: {item['question']}\nA: {item['answer']}\n\n"
    return text


def save_interview(data):
    if not os.path.exists("data"):
        os.makedirs("data")

    existing = load_interviews()  # ✅ safer reuse

    existing.append(data)

    with open(FILE_PATH, "w") as f:
        json.dump(existing, f, indent=4)


def load_interviews():
    if not os.path.exists(FILE_PATH):
        return []

    try:
        with open(FILE_PATH, "r") as f:
            content = f.read().strip()

            # ✅ Fix: handle empty file
            if not content:
                return []

            return json.loads(content)

    except json.JSONDecodeError:
        # ✅ Fix: corrupted JSON
        return []