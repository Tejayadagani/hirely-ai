import { useEffect, useState } from "react"

function ATSScore({

    candidateData,

    resumeData,

    onStartInterview,

    setGlobalATSResult
}) {

    // -----------------------------------
    // LOCAL STATES
    // -----------------------------------
    const [atsResult, setATSResult] = useState(null)

    const [loading, setLoading] = useState(true)

    // -----------------------------------
    // FETCH ATS SCORE
    // -----------------------------------
    useEffect(() => {

        const fetchATSScore = async () => {

            // -----------------------------------
            // DEBUG PAYLOAD
            // -----------------------------------
            const payload = {

                resume_text:

                    resumeData?.resume_text ||

                    resumeData?.resumeText ||

                    "",

                role:

                    candidateData?.role ||

                    "",

                tech_stack:

                    Array.isArray(

                        candidateData?.tech_stack
                    )

                    ? candidateData.tech_stack.join(", ")

                    : candidateData?.tech_stack || ""
            }

            console.log(
                "ATS PAYLOAD:",
                payload
            )

            try {

                const response = await fetch(

                    "https://hirely-ai-backend.onrender.com/ats-score",

                    {

                        method: "POST",

                        headers: {

                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(
                            payload
                        )
                    }
                )

                console.log(
                    "ATS STATUS:",
                    response.status
                )

                const data =
                    await response.json()

                console.log(
                    "ATS RESPONSE:",
                    data
                )

                // -----------------------------------
                // LOCAL ATS RESULT
                // -----------------------------------
                setATSResult(

                    data.result
                )

                // -----------------------------------
                // SAVE GLOBAL RESULT
                // -----------------------------------
                setGlobalATSResult?.(

                    data.result
                )

            } catch (error) {

                console.log(
                    "ATS ERROR:",
                    error
                )

                setATSResult(

                    "Error calculating ATS score ❌"
                )
            }

            setLoading(false)
        }

        fetchATSScore()

    }, [])

    // -----------------------------------
    // LOADING UI
    // -----------------------------------
    if (loading) {

        return (

            <div style={{

                color: "white",

                fontSize: "35px"
            }}>

                Calculating ATS Score... 😎🔥

            </div>
        )
    }

    // -----------------------------------
    // SAFE ATS DISPLAY
    // -----------------------------------
    const renderATSResult = () => {

        // STRING
        if (

            typeof atsResult === "string"
        ) {

            return atsResult
        }

        // OBJECT
        if (

            typeof atsResult === "object" &&

            atsResult !== null
        ) {

            return JSON.stringify(

                atsResult,

                null,

                2
            )
        }

        return "No ATS result available"
    }

    // -----------------------------------
    // MAIN UI
    // -----------------------------------
    return (

        <div style={{

            backgroundColor: "#18181b",

            color: "white",

            padding: "40px",

            borderRadius: "20px",

            width: "800px",

            boxSizing: "border-box"
        }}>

            {/* HEADER */}
            <h1 style={{

                fontSize: "42px",

                marginBottom: "30px",

                textAlign: "center"
            }}>

                ATS Evaluation 📊

            </h1>

            {/* CANDIDATE DETAILS */}
            <div style={{

                marginBottom: "30px",

                lineHeight: "2",

                fontSize: "18px"
            }}>

                <div>

                    <strong>Name:</strong>{" "}

                    {candidateData?.name}
                </div>

                <div>

                    <strong>Role:</strong>{" "}

                    {candidateData?.role}
                </div>

                <div>

                    <strong>Tech Stack:</strong>{" "}

                    {

                        Array.isArray(
                            candidateData?.tech_stack
                        )

                        ? candidateData.tech_stack.join(", ")

                        : candidateData?.tech_stack
                    }

                </div>

            </div>

            {/* ATS RESULT */}
            <div style={{

                backgroundColor: "#27272a",

                padding: "25px",

                borderRadius: "16px",

                whiteSpace: "pre-wrap",

                lineHeight: "2",

                fontSize: "17px",

                minHeight: "250px",

                overflowX: "auto"
            }}>

                {renderATSResult()}

            </div>

            {/* BUTTON */}
            <div style={{

                marginTop: "40px",

                textAlign: "center"
            }}>

                <button

                    onClick={onStartInterview}

                    style={{

                        backgroundColor: "white",

                        color: "black",

                        border: "none",

                        padding: "15px 28px",

                        borderRadius: "14px",

                        fontWeight: "bold",

                        fontSize: "16px",

                        cursor: "pointer"
                    }}
                >

                    Start Interview 🚀

                </button>

            </div>

        </div>
    )
}

export default ATSScore