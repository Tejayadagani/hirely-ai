import { useState } from "react"

import ReactMarkdown from "react-markdown"

function InterviewChat({

    candidateData,

    atsResult,

    onRestart,

    onInterviewComplete,

    restoredInterview
}) {

    // -----------------------------------
    // INITIAL QUESTION
    // -----------------------------------
    const initialQuestion =

        `Tell me about yourself and your experience with ${candidateData.tech_stack}`

    // -----------------------------------
    // STATES
    // -----------------------------------
    const [messages, setMessages] = useState(

        restoredInterview?.messages ||

        [

            {

                role: "assistant",

                content: initialQuestion
            }
        ]
    )

    const [input, setInput] = useState("")

    const [evaluation, setEvaluation] = useState(

        restoredInterview?.evaluation ||

        null
    )

    const [questions, setQuestions] = useState(

        restoredInterview?.questions ||

        [

            initialQuestion
        ]
    )

    const [answers, setAnswers] = useState(

        restoredInterview?.answers ||

        []
    )

    const [loading, setLoading] = useState(false)

    // -----------------------------------
    // SAFE TECH STACK
    // -----------------------------------
    const safeTechStack =

        Array.isArray(
            candidateData?.tech_stack
        )

        ? candidateData.tech_stack.join(", ")

        : candidateData?.tech_stack || ""

    // -----------------------------------
    // SEND MESSAGE
    // -----------------------------------
    const handleSend = async () => {

        if (!input.trim()) return

        // -----------------------------------
        // USER MESSAGE
        // -----------------------------------
        const updatedMessages = [

            ...messages,

            {

                role: "user",

                content: input
            }
        ]

        setMessages(updatedMessages)

        // -----------------------------------
        // ANSWERS
        // -----------------------------------
        const updatedAnswers = [

            ...answers,

            input
        ]

        setAnswers(updatedAnswers)

        setLoading(true)

        try {

            // -----------------------------------
            // FINAL EVALUATION AFTER 5 ANSWERS
            // -----------------------------------
            if (updatedAnswers.length >= 5) {

                const evalResponse = await fetch(

                    "http://127.0.0.1:8000/evaluate-interview",

                    {

                        method: "POST",

                        headers: {

                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            questions,

                            answers: updatedAnswers,

                            tech_stack:
                                safeTechStack
                        })
                    }
                )

                const evalData =
                    await evalResponse.json()

                // -----------------------------------
                // COMPLETE INTERVIEW OBJECT
                // -----------------------------------
                const completedInterview = {

                    id: Date.now(),

                    name:
                        candidateData.name,

                    role:
                        candidateData.role,

                    timestamp:
                        new Date().toLocaleString(),

                    atsResult,

                    evaluation:
                        evalData.evaluation,

                    messages: [

                        ...updatedMessages,

                        {

                            role: "assistant",

                            content:
                                evalData.evaluation
                        }
                    ],

                    questions,

                    answers:
                        updatedAnswers,

                    interviewMode:
                        "chat"
                }

                // -----------------------------------
                // SAVE HISTORY
                // -----------------------------------
                const existingHistory =

                    JSON.parse(

                        localStorage.getItem(
                            "hirely_history"
                        )

                        || "[]"
                    )

                const updatedHistory = [

                    ...existingHistory,

                    completedInterview
                ]

                localStorage.setItem(

                    "hirely_history",

                    JSON.stringify(
                        updatedHistory
                    )
                )

                // -----------------------------------
                // UPDATE HOME STATE
                // -----------------------------------
                onInterviewComplete(
                    completedInterview
                )

                // -----------------------------------
                // SAVE DB + SEND MAIL
                // -----------------------------------
                await fetch(

                    "http://127.0.0.1:8000/save-interview",

                    {

                        method: "POST",

                        headers: {

                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            candidate_name:
                                candidateData.name,

                            candidate_email:

                                candidateData.email ||

                                "test@gmail.com",

                            role:
                                candidateData.role,

                            ats_score:

                                typeof atsResult === "string"

                                ? atsResult

                                : JSON.stringify(
                                    atsResult
                                  ),

                            evaluation:
                                evalData.evaluation
                        })
                    }
                )

                setEvaluation(
                    evalData.evaluation
                )

                setLoading(false)

                return
            }

            // -----------------------------------
            // GENERATE FOLLOW-UP QUESTION
            // -----------------------------------
            const response = await fetch(

                "http://127.0.0.1:8000/generate-question",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        tech_stack:
                            safeTechStack,

                        experience:
                            candidateData.experience ||

                            "Fresher",

                        question:
                            questions[
                                questions.length - 1
                            ],

                        answer:
                            input,

                        resume_text:

                            candidateData.resumeText ||

                            ""
                    })
                }
            )

            const data =
                await response.json()

            const nextQuestion =

                data.question ||

                "Explain one project."

            // -----------------------------------
            // ADD FOLLOW-UP QUESTION
            // -----------------------------------
            setMessages([

                ...updatedMessages,

                {

                    role: "assistant",

                    content:
                        nextQuestion
                }
            ])

            setQuestions([

                ...questions,

                nextQuestion
            ])

        } catch (error) {

            console.log(error)
        }

        setInput("")

        setLoading(false)
    }

    // -----------------------------------
    // EVALUATION SCREEN
    // -----------------------------------
    if (evaluation) {

        return (

            <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-[32px] p-12 text-white shadow-2xl">

                {/* HEADER */}
                <div className="mb-10">

                    <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-2xl mb-5">

                        ✅ Interview Completed

                    </div>

                    <h1 className="text-5xl font-black tracking-tight mb-4">

                        Great Job,

                        <span className="text-green-400 ml-3">

                            {candidateData.name}

                        </span>

                    </h1>

                    <p className="text-zinc-500 text-lg">

                        AI Interview Evaluation Report

                    </p>

                </div>

                {/* EVALUATION */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 prose prose-invert max-w-none">

                    <ReactMarkdown>

                        {evaluation}

                    </ReactMarkdown>

                </div>

                {/* BUTTON */}
                <div className="mt-10">

                    <button

                        onClick={onRestart}

                        className="bg-green-500 hover:bg-green-400 transition-all duration-200 px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-green-500/20"
                    >

                        ➕ Start New Interview

                    </button>

                </div>

            </div>
        )
    }

    // -----------------------------------
    // CHAT UI
    // -----------------------------------
    return (

        <div className="w-full max-w-6xl h-[92vh] bg-zinc-950 border border-zinc-800 rounded-[32px] overflow-hidden flex flex-col shadow-2xl">

            {/* HEADER */}
            <div className="border-b border-zinc-800 px-8 py-6 flex items-center justify-between bg-zinc-950/80 backdrop-blur-xl">

                <div>

                    <h1 className="text-3xl font-black text-white">

                        AI Interview Session

                    </h1>

                    <div className="flex items-center gap-3 mt-2">

                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

                        <p className="text-zinc-500 text-sm">

                            Live Interview in Progress

                        </p>

                    </div>

                </div>

                {/* COUNTER */}
                <div className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl text-zinc-300 font-semibold">

                    Question

                    <span className="text-green-400 ml-2">

                        {Math.min(
                            answers.length + 1,
                            5
                        )}

                    </span>

                    /5

                </div>

            </div>

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-6 bg-gradient-to-b from-black to-zinc-950">

                {
                    messages.map((msg, index) => (

                        <div

                            key={index}

                            className={`flex ${
                                msg.role === "user"

                                ? "justify-end"

                                : "justify-start"
                            }`}
                        >

                            <div

                                className={`max-w-[75%] px-6 py-5 rounded-3xl prose prose-invert max-w-none shadow-xl ${
                                    msg.role === "user"

                                    ?

                                    "bg-green-500 text-black"

                                    :

                                    "bg-zinc-900 border border-zinc-800 text-zinc-200"
                                }`}
                            >

                                <ReactMarkdown>

                                    {msg.content}

                                </ReactMarkdown>

                            </div>

                        </div>
                    ))
                }

                {/* LOADING */}
                {
                    loading && (

                        <div className="flex justify-start">

                            <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-3xl text-zinc-500">

                                AI is thinking...

                            </div>

                        </div>
                    )
                }

            </div>

            {/* INPUT */}
            <div className="border-t border-zinc-800 bg-zinc-950 p-6">

                <div className="flex items-center gap-4">

                    <input

                        value={input}

                        onChange={(e) =>
                            setInput(e.target.value)
                        }

                        placeholder="Type your answer..."

                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-green-500 outline-none rounded-2xl px-6 py-5 text-white placeholder:text-zinc-500 transition-all duration-200"
                    />

                    <button

                        onClick={handleSend}

                        disabled={loading}

                        className="bg-green-500 hover:bg-green-400 transition-all duration-200 text-black font-bold px-8 py-5 rounded-2xl shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                        Send

                    </button>

                </div>

            </div>

        </div>
    )
}

export default InterviewChat