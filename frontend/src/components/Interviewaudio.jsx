import {

    useEffect,

    useState

} from "react"

function AudioInterview({

    candidateData,

    atsResult,

    onRestart
}) {

    // -----------------------------------
    // INITIAL QUESTION
    // -----------------------------------
    const initialQuestion =

       `Tell me about yourself and the technologies you frequently used in your projects.`

    // -----------------------------------
    // STATES
    // -----------------------------------
    const [currentQuestion, setCurrentQuestion] =

        useState(initialQuestion)

    const [answers, setAnswers] = useState([])

    const [questions, setQuestions] = useState([

        initialQuestion
    ])

    const [currentAnswer, setCurrentAnswer] =

        useState("")

    const [evaluation, setEvaluation] =

        useState(null)

    const [loading, setLoading] =

        useState(false)

    const [isListening, setIsListening] =

        useState(false)

    // -----------------------------------
    // SPEAK TEXT
    // -----------------------------------
    const speakText = (text) => {

        // STOP PREVIOUS SPEECH
        window.speechSynthesis.cancel()

        const speech =

            new SpeechSynthesisUtterance(text)

        speech.lang = "en-US"

        speech.rate = 1

        speech.pitch = 1

        // SPEECH FINISHED
        speech.onend = () => {

            setIsListening(false)
        }

        window.speechSynthesis.speak(speech)
    }

    // -----------------------------------
    // SPEAK INITIAL QUESTION
    // -----------------------------------
    useEffect(() => {

        speakText(initialQuestion)

    }, [])

    // -----------------------------------
    // START LISTENING
    // -----------------------------------
    const startListening = () => {

        // PREVENT MULTIPLE REQUESTS
        if (isListening || loading) return

        const SpeechRecognition =

            window.SpeechRecognition ||

            window.webkitSpeechRecognition

        if (!SpeechRecognition) {

            alert(

                "Speech Recognition not supported 😭"
            )

            return
        }

        const recognition =
            new SpeechRecognition()

        recognition.lang = "en-US"

        recognition.continuous = false

        recognition.interimResults = false

        setIsListening(true)

        recognition.start()

        recognition.onresult = async (event) => {

            const transcript =

                event.results[0][0].transcript

            setCurrentAnswer(transcript)

            recognition.stop()

            setIsListening(false)

            await processAnswer(transcript)
        }

        recognition.onerror = (event) => {

            console.log(event.error)

            setIsListening(false)
        }

        recognition.onend = () => {

            setIsListening(false)
        }
    }

    // -----------------------------------
    // PROCESS ANSWER
    // -----------------------------------
    const processAnswer = async (answer) => {

        const updatedAnswers = [

            ...answers,

            answer
        ]

        setAnswers(updatedAnswers)

        setLoading(true)

        try {

            // -----------------------------------
            // AFTER 5 ANSWERS
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
                                candidateData.tech_stack
                        })
                    }
                )

                const evalData =
                    await evalResponse.json()

                // -----------------------------------
                // SAVE INTERVIEW
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
                                candidateData.email,

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

                    evalData.evaluation ||

                    "Interview Completed 😎🔥"
                )

                setLoading(false)

                return
            }

            // -----------------------------------
            // GENERATE NEXT QUESTION
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
                            candidateData.tech_stack,

                        experience:
                            candidateData.experience ||

                            "Fresher",

                        question:
                            questions[
                                questions.length - 1
                            ],

                        answer:
                            answer,

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

                "Explain one project you worked on."

            // -----------------------------------
            // UPDATE QUESTION
            // -----------------------------------
            setCurrentQuestion(nextQuestion)

            setQuestions([

                ...questions,

                nextQuestion
            ])

            // -----------------------------------
            // SPEAK ONLY ONE QUESTION
            // -----------------------------------
            speakText(nextQuestion)

        } catch (error) {

            console.log(error)
        }

        setLoading(false)
    }

    // -----------------------------------
    // EVALUATION SCREEN
    // -----------------------------------
    if (evaluation) {

        return (

            <div style={{

                width: "900px",

                backgroundColor: "#18181b",

                color: "white",

                padding: "40px",

                borderRadius: "20px",

                whiteSpace: "pre-wrap",

                lineHeight: "2"
            }}>

                <h1 style={{

                    fontSize: "40px",

                    marginBottom: "30px"
                }}>

                    🎉 Audio Interview Completed

                </h1>

                <div style={{

                    fontSize: "20px"
                }}>

                    {evaluation}

                </div>

                <div style={{

                    marginTop: "40px",

                    textAlign: "center"
                }}>

                    <button

                        onClick={onRestart}

                        style={{

                            backgroundColor: "white",

                            color: "black",

                            border: "none",

                            padding: "15px 30px",

                            borderRadius: "14px",

                            fontWeight: "bold",

                            fontSize: "16px",

                            cursor: "pointer"
                        }}
                    >

                        ➕ Start New Interview

                    </button>

                </div>

            </div>
        )
    }

    // -----------------------------------
    // MAIN UI
    // -----------------------------------
    return (

        <div style={{

            width: "900px",

            backgroundColor: "#18181b",

            color: "white",

            padding: "40px",

            borderRadius: "20px",

            textAlign: "center"
        }}>

            <h1 style={{

                fontSize: "40px",

                marginBottom: "20px"
            }}>

                🎙️ Audio AI Interview

            </h1>

            {/* QUESTION */}
            <div style={{

                backgroundColor: "#27272a",

                padding: "25px",

                borderRadius: "18px",

                marginTop: "20px",

                fontSize: "22px",

                lineHeight: "1.8"
            }}>

                {currentQuestion}

            </div>

            {/* ANSWER */}
            <div style={{

                marginTop: "30px",

                fontSize: "18px",

                color: "#a1a1aa"
            }}>

                Your Answer:
            </div>

            <div style={{

                marginTop: "10px",

                backgroundColor: "#27272a",

                padding: "20px",

                borderRadius: "16px",

                minHeight: "80px",

                fontSize: "18px"
            }}>

                {currentAnswer ||

                    "Waiting for answer..."}
            </div>

            {/* BUTTON */}
            <button

                onClick={startListening}

                disabled={loading || isListening}

                style={{

                    marginTop: "40px",

                    backgroundColor: "white",

                    color: "black",

                    border: "none",

                    padding: "18px 35px",

                    borderRadius: "16px",

                    fontWeight: "bold",

                    fontSize: "20px",

                    cursor: "pointer",

                    opacity:

                        loading || isListening

                        ? 0.6

                        : 1
                }}
            >

                {

                    isListening

                    ?

                    "🎙️ Listening..."

                    :

                    "🎤 Speak Answer"
                }

            </button>

            {/* LOADING */}
            {
                loading && (

                    <div style={{

                        marginTop: "20px",

                        color: "#a1a1aa"
                    }}>

                        AI is processing...
                    </div>
                )
            }

        </div>
    )
}

export default AudioInterview