# 🤖 AI Hiring Agent – TalentScout

An intelligent **AI-powered Hiring Assistant** built using **Streamlit** and **Groq LLM APIs** that conducts structured technical interviews, evaluates candidate responses, and maintains interview history.

---

## 🚀 Project Overview

The **AI Hiring Agent** is designed to simulate a real-world technical interview process.
Unlike a basic chatbot, this system provides a **guided interview experience**:

* Collects candidate information
* Generates technical questions based on tech stack
* Conducts interactive interviews
* Evaluates responses using AI
* Stores and manages multiple interview sessions

---

## ✨ Features

### 🧑‍💼 Candidate Screening

* Collects:

  * Full Name
  * Email
  * Phone Number
  * Experience
  * Desired Role
  * Location
  * Tech Stack

---

### 🧠 AI Question Generation

* Powered by **Groq LLM API**
* Uses **Meta LLaMA 4 Scout (17B Instruct)**
* Generates **role-based technical questions**
* Adapts to candidate experience level

---

### 💬 Interactive Interview

* Chat-style interface
* One question at a time
* Maintains conversation context

---

### 📊 AI Evaluation System

* Evaluates each answer individually
* Provides:

  * Score (out of 10)
  * Strengths
  * Weaknesses
  * Final feedback
* Structured and readable output

---

### 📂 Interview History

* Stores all interviews locally (JSON)
* Sidebar navigation to view past interviews
* Supports multiple candidates & roles

---

### 🔄 Multi-Session Support

* Start new interviews anytime
* Unique interview IDs
* Persistent data storage

---

## 🏗️ Project Structure

```
ai_hiring_agent/
│
├── app.py                  # Main Streamlit app
├── config.py               # API configuration
│
├── prompts/
│   ├── question_prompt.py
│   ├── evaluation_prompt.py
│
├── services/
│   └── llm_service.py      # Groq API integration
│
├── utils/
│   ├── session_manager.py
│   ├── helpers.py
│
├── ui/
│   ├── styles.py
│   ├── components.py
│
├── data/
│   └── candidates.json     # Stored interview data
│
├── .env
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd ai_hiring_agent
```

---

### 2. Create virtual environment

```bash
python -m venv .venv
source .venv/bin/activate   # Mac/Linux
.venv\Scripts\activate      # Windows
```

---

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🔐 Environment Setup

Create a `.env` file:

```
GROQ_API_KEY=your_groq_api_key_here
```

👉 Get API key from: https://console.groq.com/

---

## ▶️ Run the Application

```bash
streamlit run app.py
```

---

## 🧠 Technologies Used

* **Frontend:** Streamlit
* **Backend:** Python
* **LLM API:** Groq
* **Model:** Meta LLaMA 4 Scout (17B Instruct)
* **Data Storage:** JSON
* **State Management:** Streamlit Session State

---

## 🧩 Prompt Engineering

The system uses **role-based prompting**:

### Question Generation

* AI acts as a **Senior Technical Interviewer**
* Generates relevant, real-world questions

### Answer Evaluation

* Provides:

  * Score (out of 10)
  * Strengths
  * Weaknesses
  * Final feedback

---

## 🔒 Data Handling & Privacy

* Data stored locally in JSON format
* No external database used
* No sensitive data sharing
* Suitable for demo/testing environments

---

## ⚠️ Challenges & Solutions

| Challenge                    | Solution                  |
| ---------------------------- | ------------------------- |
| LLM output formatting issues | Strict prompt engineering |
| JSON decode errors           | Added error handling      |
| Multi-session handling       | Unique interview IDs      |
| Context management           | Session state tracking    |

---

## 🎯 Future Enhancements

* 📊 Candidate performance dashboard
* 📄 PDF report generation
* 🌐 Cloud deployment (Streamlit Cloud / AWS)
* 🔍 Search & filter interview history
* 🎙️ Voice-based interviews

---

## 📌 Evaluation Criteria Alignment

✔ Technical implementation of AI hiring flow
✔ Strong prompt engineering
✔ Clean UI/UX with Streamlit
✔ Context-aware interactions
✔ Modular and maintainable code

---

## 👨‍💻 Author

**Dharma Teja Yadagani**

---

## 📄 License

This project is for educational and assignment purposes.
