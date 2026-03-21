import streamlit as st

def show_progress(step):
    st.progress(step / 5)

def welcome_screen():
    st.subheader("👋 Welcome to AI Hiring Agent")
    return st.button("Start Interview")

def candidate_form():
    name = st.text_input("Full Name")
    email = st.text_input("Email")
    phone = st.text_input("Phone")
    experience = st.text_input("Experience")
    role = st.text_input("Desired Role")
    location = st.text_input("Location")
    tech_stack = st.text_input("Tech Stack")

    submitted = st.button("Continue")

    return submitted, {
        "name": name,
        "email": email,
        "phone": phone,
        "experience": experience,
        "role": role,
        "location": location,
        "tech_stack": tech_stack
    }