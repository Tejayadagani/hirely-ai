import streamlit as st
import uuid

def init_session():
    if "step" not in st.session_state:
        st.session_state.step = 1

    if "candidate" not in st.session_state:
        st.session_state.candidate = {}

    if "questions" not in st.session_state:
        st.session_state.questions = []

    if "answers" not in st.session_state:
        st.session_state.answers = []

    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    if "q_index" not in st.session_state:
        st.session_state.q_index = 0

    if "interview_id" not in st.session_state:
        st.session_state.interview_id = str(uuid.uuid4())

    if "evaluation" not in st.session_state:
        st.session_state.evaluation = None