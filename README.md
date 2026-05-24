<div align="center">

# 🚀 Hirely AI
### Intelligent AI Hiring Assistant Platform

<img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Backend-FastAPI-green?style=for-the-badge" />
<img src="https://img.shields.io/badge/AI-Groq-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Database-SQLite-lightgrey?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-Production Ready-success?style=for-the-badge" />

---

### 💡 AI-Powered Hiring Automation Platform

Hirely AI is a full-stack AI recruitment platform that automates resume screening, ATS analysis, technical interviewing, recruiter evaluation workflows, and candidate communication using Generative AI.

</div>

---

# 📌 Table of Contents

- Overview
- Features
- System Architecture
- Tech Stack
- Screenshots
- Installation
- Environment Variables
- Project Workflow
- Challenges Faced
- Key Learnings
- Future Enhancements
- Deployment
- Author

---

# 🌟 Overview

Modern hiring processes are often time-consuming, repetitive, and inconsistent. Hirely AI was developed to solve these challenges by introducing an AI-driven recruitment workflow capable of:

- Screening resumes automatically
- Evaluating ATS compatibility
- Conducting intelligent technical interviews
- Generating adaptive follow-up questions
- Maintaining recruiter dashboards
- Sending automated candidate emails

The platform provides a recruiter-like interview experience while reducing manual effort significantly.

---

# ✨ Core Features

## 📄 AI Resume Screening
- Upload candidate resumes
- Extract technical skills automatically
- ATS compatibility scoring
- Resume evaluation summary
- Recruiter-friendly insights

---

## 🤖 Adaptive AI Technical Interview

### Chat Interview Mode
- Context-aware technical interviewing
- Intelligent follow-up questions
- Dynamic conversation flow
- AI-generated evaluation reports

### Audio Interview Mode
- Speech recognition support
- AI voice questioning
- One-question-at-a-time interview flow
- Natural voice interaction

---

## 📊 Recruiter Dashboard
- View completed interviews
- Candidate evaluation tracking
- Interview history persistence
- Interview management system
- Clear interview records functionality

---

## 📧 Automated Email System
- Sends interview completion confirmation emails
- Professional recruiter communication workflow
- Integrated SMTP email service

---

# 🧠 AI Capabilities

Hirely AI uses Generative AI to:

- Analyze resumes
- Evaluate candidate responses
- Generate technical interview questions
- Ask contextual follow-up questions
- Summarize interview performance
- Simulate recruiter-like interactions

---

# 🏗️ System Architecture

```text
Frontend (React + Vite)
        ↓
FastAPI Backend APIs
        ↓
Groq AI Integration
        ↓
SQLite Database
        ↓
Email Notification System
```

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript
- Speech Recognition API
- Speech Synthesis API

---

## Backend
- FastAPI
- Python
- SQLite
- FastAPI-Mail

---

## AI Integration
- GroqAPI
- Prompt Engineering
- AI Evaluation Logic

---

# 📸 Screenshots

## 🖥️ User Interface

<img width="1402" height="812" alt="UserInterface" src="https://github.com/user-attachments/assets/19f96aed-2497-44f3-8cf1-ccf541ffad6e" />

---

## 📊 ATS Evaluation

<img width="1414" height="834" alt="ATS evaluation" src="https://github.com/user-attachments/assets/95f8a3bc-9bf6-4f6c-85f4-88a2bc393784" />

---

##  🧠 AI Interview Mode

<img width="1010" height="453" alt="interview mode" src="https://github.com/user-attachments/assets/358e40fa-09d5-4044-a465-cedb7097987a" />

---


## 💬 AI Chat Interview

<img width="1137" height="803" alt="chat interface" src="https://github.com/user-attachments/assets/468ac714-6c29-4132-a4c4-fddfa1a0e7b3" />

---

## 🎙️ Audio Interview

<img width="996" height="590" alt="Audio Interview" src="https://github.com/user-attachments/assets/99e95b09-f733-4072-be30-70d35146a51e" />

---

## 📈 Recruiter Dashboard

<img width="1434" height="841" alt="dashboard" src="https://github.com/user-attachments/assets/4e395317-280f-4950-8122-e7fe4d124353" />

---

# ⚙️ Installation Guide

# 1️⃣ Clone Repository

```bash
git clone https://github.com/Tejayadagani/hirely-ai.git
```

---

# 2️⃣ Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:
```text
http://127.0.0.1:8000
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:
```text
http://127.0.0.1:5173
```

---

# 🔑 Environment Variables

Create `.env` file:

```env
MAIL_USERNAME=

MAIL_PASSWORD=

MAIL_FROM=

MAIL_PORT=

MAIL_SERVER=

GEMINI_API_KEY=
```

---

# 🔄 Project Workflow

```text
Resume Upload
      ↓
ATS Analysis
      ↓
AI Technical Interview
      ↓
Dynamic Follow-Up Questions
      ↓
Interview Evaluation
      ↓
Database Storage
      ↓
Recruiter Dashboard
      ↓
Candidate Email Notification
```

---

# 🚧 Challenges Faced During Development

## 🔹 AI Follow-Up Question Logic
One major challenge was ensuring the AI interviewer generated contextual follow-up questions instead of generic repeated questions.

### Solution:
Implemented prompt engineering strategies using:
- Previous question context
- Candidate answer analysis
- Tech stack awareness
- Conversational memory flow

---

## 🔹 Audio Interview Synchronization
Speech synthesis and speech recognition overlapped during audio interviews.

### Solution:
Implemented:
- One-question-at-a-time flow
- Speech cancellation handling
- Listening state management
- Sequential AI interaction logic

---

## 🔹 Local Storage Persistence
Interview history was lost after browser refresh.

### Solution:
Integrated:
- localStorage persistence
- Session restoration logic
- Dynamic state hydration

---

## 🔹 Email Authentication Errors
SMTP login failures occurred due to Gmail security restrictions.

### Solution:
Configured:
- Google App Passwords
- Secure SMTP authentication
- Environment variable protection

---

# 📚 Key Learnings

This project provided hands-on experience in:

- Full Stack Development
- REST API Design
- AI Prompt Engineering
- FastAPI Backend Architecture
- State Management
- Voice AI Integration
- Async Programming
- Deployment Preparation
- Database Operations
- Real-world Debugging

---

# 🚀 Future Enhancements

## 🔐 Authentication System
- JWT authentication
- Recruiter login/signup
- Candidate authentication

---

## 📹 Live Video Interview
- AI-powered video interviews
- Real-time proctoring
- Webcam monitoring

---

## ☁️ Cloud Database
- PostgreSQL integration
- Scalable production database
- Cloud persistence

---

## 📈 Analytics Dashboard
- Candidate analytics
- Interview trends
- Recruiter insights
- AI performance metrics

---

## 🤖 Advanced AI Features
- Emotion detection
- Behavioral analysis
- AI cheating detection
- Resume-job matching engine

---

# 🌐 Deployment

## Frontend
- Vercel:https://hirely-ai-six.vercel.app/

## Backend
- Render:https://hirely-ai-backend.onrender.com

---

# 👨‍💻 Author

## Dharma Teja Yadagani

Passionate Full Stack & AI Developer focused on building intelligent real-world applications using modern web technologies and Generative AI.

---

# ⭐ Support

If you found this project useful:

- ⭐ Star this repository
- 🍴 Fork the project
- 🚀 Share with others

---

<div align="center">

# 🚀 Hirely AI
### Built with ❤️ using AI + Full Stack Engineering

</div>
