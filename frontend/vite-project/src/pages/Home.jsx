import {

    useState,

    useEffect

} from "react"

import ResumeUpload from "../components/ResumeUpload"

import CandidateForm from "../components/CandidateForm"

import ATSScore from "../components/ATSScore"

import InterviewChat from "../components/InterviewChat"

import InterviewMode from "../components/InterviewMode"

import InterviewSidebar from "../components/InterviewSidebar"

import RecruiterDashboard from "./Dashboard"

import AudioInterview from "../components/Interviewaudio"

function Home() {

    // -----------------------------------
    // STATES
    // -----------------------------------
    const [step, setStep] = useState(1)

    const [resumeData, setResumeData] =
        useState(null)

    const [candidateData, setCandidateData] =
        useState(null)

    const [atsResult, setATSResult] =
        useState(null)

    const [interviewMode, setInterviewMode] =
        useState(null)

    const [interviewHistory, setInterviewHistory] = useState(() => {

        const savedHistory = localStorage.getItem(

            "hirely_history"
        )

        return savedHistory

            ?

            JSON.parse(savedHistory)

            :

            []
    })

    useEffect(() => {

        localStorage.setItem(

            "hirely_history",

            JSON.stringify(
                interviewHistory
            )
        )

    }, [interviewHistory])

    const [selectedInterview, setSelectedInterview] =
        useState(null)

    const [restoredInterview, setRestoredInterview] =
        useState(null)

    const [activePage, setActivePage] =
        useState("interview")

    // -----------------------------------
    // LOAD HISTORY
    // -----------------------------------
    useEffect(() => {

        const savedHistory =

            localStorage.getItem(
                "hirely_history"
            )

        if (savedHistory) {

            setInterviewHistory(

                JSON.parse(savedHistory)
            )
        }

    }, [])

    // -----------------------------------
    // SAVE HISTORY
    // -----------------------------------
    useEffect(() => {

        localStorage.setItem(

            "hirely_history",

            JSON.stringify(
                interviewHistory
            )
        )

    }, [interviewHistory])

    // -----------------------------------
    // DELETE INTERVIEW
    // -----------------------------------
    const handleDeleteInterview = (id) => {

        const filteredHistory =

            interviewHistory.filter(

                item => item.id !== id
            )

        setInterviewHistory(
            filteredHistory
        )

        localStorage.setItem(

            "hirely_history",

            JSON.stringify(
                filteredHistory
            )
        )
    }

    // -----------------------------------
    // RESUME UPLOAD
    // -----------------------------------
    const handleUpload = (data) => {

        setResumeData(data)

        setStep(2)
    }

    // -----------------------------------
    // FORM SUBMIT
    // -----------------------------------
    const handleFormSubmit = async (data) => {

        setCandidateData(data)

        try {

            await fetch(

                "http://127.0.0.1:8000/save-candidate",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name:
                            data.name,

                        email:
                            data.email ||

                            "test@gmail.com",

                        role:
                            data.role,

                        tech_stack:

                            Array.isArray(
                                data.tech_stack
                            )

                            ? data.tech_stack.join(", ")

                            : data.tech_stack || "",

                        experience:
                            data.experience ||

                            "Fresher",

                        resume_text:

                            resumeData?.resume_text ||

                            ""
                    })
                }
            )

        } catch (error) {

            console.log(error)
        }

        setStep(3)
    }

    // -----------------------------------
    // START INTERVIEW
    // -----------------------------------
    const handleStartInterview = () => {

        setStep(4)
    }

    // -----------------------------------
    // SELECT MODE
    // -----------------------------------
    const handleModeSelect = (mode) => {

        setInterviewMode(mode)
    }

    // -----------------------------------
    // COMPLETE INTERVIEW
    // -----------------------------------
    const handleInterviewComplete = (

        interviewData

    ) => {

        const updatedInterview = {

            ...interviewData,

            timestamp:

                interviewData.timestamp ||

                new Date().toLocaleString()
        }

        setInterviewHistory(prev => {

            const exists = prev.some(

                item => item.id === updatedInterview.id
            )

            if (exists) {

                return prev
            }

            return [

                ...prev,

                updatedInterview
            ]
        })
    }

    // -----------------------------------
    // SELECT HISTORY
    // -----------------------------------
    const handleSelectInterview = (item) => {

        setSelectedInterview(item)

        setRestoredInterview(item)

        setActivePage("interview")

        setInterviewMode(item.interviewMode)

        setStep(4)
    }

    // -----------------------------------
    // NEW INTERVIEW
    // -----------------------------------
    const handleNewInterview = () => {

        setActivePage("interview")

        setStep(1)

        setResumeData(null)

        setCandidateData(null)

        setInterviewMode(null)

        setATSResult(null)

        setSelectedInterview(null)

        setRestoredInterview(null)
    }

    // -----------------------------------
    // RESTART
    // -----------------------------------
    const handleRestart = () => {

        handleNewInterview()
    }

    // -----------------------------------
    // MAIN UI
    // -----------------------------------
    return (

        <div className="min-h-screen bg-black flex">

            {/* SIDEBAR */}
            <InterviewSidebar

                interviewHistory={
                    interviewHistory
                }

                onNewInterview={
                    handleNewInterview
                }

                onSelectInterview={
                    handleSelectInterview
                }

                onOpenDashboard={() =>
                    setActivePage("dashboard")
                }

                onDeleteInterview={
                    handleDeleteInterview
                }
            />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex items-center justify-center p-10">

                {
                    activePage === "dashboard" && (

                        <RecruiterDashboard />
                    )
                }

                {
                    activePage === "interview" && (

                        <>

                            {
                                step === 1 && (

                                    <ResumeUpload

                                        onUploadSuccess={
                                            handleUpload
                                        }
                                    />
                                )
                            }

                            {
                                step === 2 && (

                                    <CandidateForm

                                        onContinue={
                                            handleFormSubmit
                                        }

                                        parsedData={
                                            resumeData?.parsedData || {}
                                        }
                                    />
                                )
                            }

                            {
                                step === 3 && (

                                    <ATSScore

                                        candidateData={
                                            candidateData
                                        }

                                        resumeData={
                                            resumeData
                                        }

                                        onStartInterview={
                                            handleStartInterview
                                        }

                                        setGlobalATSResult={
                                            setATSResult
                                        }
                                    />
                                )
                            }

                            {
                                step === 4 && !interviewMode && (

                                    <InterviewMode

                                        onSelectMode={
                                            handleModeSelect
                                        }
                                    />
                                )
                            }

                            {
                                interviewMode === "chat" && (

                                    <InterviewChat

                                        candidateData={
                                            restoredInterview

                                            ? {

                                                name:
                                                    restoredInterview.name,

                                                role:
                                                    restoredInterview.role,

                                                tech_stack:
                                                    restoredInterview.role
                                            }

                                            : candidateData
                                        }

                                        atsResult={
                                            restoredInterview

                                            ? restoredInterview.atsResult

                                            : atsResult
                                        }

                                        restoredInterview={
                                            restoredInterview
                                        }

                                        onRestart={
                                            handleRestart
                                        }

                                        onInterviewComplete={
                                            handleInterviewComplete
                                        }
                                    />
                                )
                            }

                            {
                                interviewMode === "audio" && (

                                    <AudioInterview

                                        candidateData={
                                            candidateData
                                        }

                                        atsResult={
                                            atsResult
                                        }

                                        onRestart={
                                            handleRestart
                                        }
                                    />
                                )
                            }

                        </>
                    )
                }

            </div>

        </div>
    )
}

export default Home