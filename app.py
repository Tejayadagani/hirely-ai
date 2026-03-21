import streamlit as st
import uuid
import re

from utils.session_manager import init_session
from ui.styles import apply_styles
from ui.components import show_progress, welcome_screen, candidate_form

from prompts.question_prompt import question_system_prompt, generate_questions_user_prompt
from prompts.evaluation_prompt import evaluation_system_prompt, evaluation_user_prompt

from services.llm_service import get_llm_response
from utils.helpers import format_qa, save_interview, load_interviews

# Init
st.set_page_config(page_title="AI Hiring Agent", layout="centered")
apply_styles()
init_session()

st.title("🤖 TalentScout AI Hiring Agent")
show_progress(st.session_state.step)

# ================= SIDEBAR =================
st.sidebar.title("📂 Interview History")

history = load_interviews()

if st.sidebar.button("➕ New Interview"):
    st.session_state.step = 1
    st.session_state.candidate = {}
    st.session_state.questions = []
    st.session_state.answers = []
    st.session_state.chat_history = []
    st.session_state.q_index = 0
    st.session_state.interview_id = str(uuid.uuid4())
    st.session_state.evaluation = None
    st.rerun()

for item in history[::-1]:
    name = item["candidate"].get("name", "Unknown")
    role = item["candidate"].get("role", "N/A")

    if st.sidebar.button(f"{name} - {role}", key=item["id"]):
        st.session_state.step = 5
        st.session_state.candidate = item["candidate"]
        st.session_state.answers = item["answers"]
        st.session_state.evaluation = item["evaluation"]

# ================= MAIN FLOW =================

# STEP 1
if st.session_state.step == 1:
    if welcome_screen():
        st.session_state.step = 2

# STEP 2
elif st.session_state.step == 2:
    submitted, data = candidate_form()
    if submitted:
        st.session_state.candidate = data
        st.session_state.step = 3

# STEP 3
elif st.session_state.step == 3:
    with st.spinner("Generating questions..."):
        system_prompt = question_system_prompt()
        user_prompt = generate_questions_user_prompt(
            st.session_state.candidate["tech_stack"],
            st.session_state.candidate["experience"]
        )

        response = get_llm_response(system_prompt, user_prompt)

        questions = [
            re.sub(r"^\d+[\).\-\s]*", "", q).strip()
            for q in response.split("\n") if q.strip()
        ]

        st.session_state.questions = questions

    st.session_state.step = 4
    st.rerun()

# STEP 4
elif st.session_state.step == 4:
    st.subheader("💬 Interview")

    questions = st.session_state.questions

    for chat in st.session_state.chat_history:
        with st.chat_message(chat["role"]):
            st.markdown(chat["content"])

    if st.session_state.q_index < len(questions):
        q = questions[st.session_state.q_index]

        with st.chat_message("assistant"):
            st.markdown(q)

        user_input = st.chat_input("Your answer...")

        if user_input:
            st.session_state.chat_history.append({"role": "assistant", "content": q})
            st.session_state.chat_history.append({"role": "user", "content": user_input})

            st.session_state.answers.append({
                "question": q,
                "answer": user_input
            })

            st.session_state.q_index += 1
            st.rerun()

    else:
        if st.button("Evaluate"):
            st.session_state.step = 5

# STEP 5
elif st.session_state.step == 5:
    st.subheader("📊 Evaluation")

    if not st.session_state.evaluation:
        qa_text = format_qa(st.session_state.answers)

        with st.spinner("Evaluating..."):
            system_prompt = evaluation_system_prompt()
            user_prompt = evaluation_user_prompt(qa_text)

            result = get_llm_response(system_prompt, user_prompt)
            st.session_state.evaluation = result

            # SAVE INTERVIEW
            save_interview({
                "id": st.session_state.interview_id,
                "candidate": st.session_state.candidate,
                "answers": st.session_state.answers,
                "evaluation": result
            })

    st.markdown(st.session_state.evaluation)
    st.success("🎉 Completed!")