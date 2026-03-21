import streamlit as st

def apply_styles():
    st.markdown("""
    <style>
    body {
        background-color: #0e1117;
    }
    .stButton>button {
        border-radius: 10px;
        height: 45px;
        width: 100%;
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
    }
    </style>
    """, unsafe_allow_html=True)