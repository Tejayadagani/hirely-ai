import {

    useEffect,

    useState

} from "react"

function Dashboard() {

    // -----------------------------------
    // STATES
    // -----------------------------------
    const [interviews, setInterviews] =
        useState([])

    // -----------------------------------
    // FETCH INTERVIEWS
    // -----------------------------------
    const fetchInterviews = async () => {

        try {

            const response = await fetch(

                "https://hirely-ai-backend.onrender.com/get-interviews"
            )

            const data =
                await response.json()

            setInterviews(

                data.interviews || []
            )

        } catch (error) {

            console.log(error)
        }
    }

    // -----------------------------------
    // LOAD
    // -----------------------------------
    useEffect(() => {

        fetchInterviews()

    }, [])

    // -----------------------------------
    // CLEAR DASHBOARD
    // -----------------------------------
    const handleClearDashboard = async () => {

        const confirmDelete =

            window.confirm(

                "Delete all interview records?"
            )

        if (!confirmDelete) return

        try {

            await fetch(

                "https://hirely-ai-backend.onrender.com/clear-interviews",

                {

                    method: "DELETE"
                }
            )

            setInterviews([])

        } catch (error) {

            console.log(error)
        }
    }

    // -----------------------------------
    // ANALYTICS
    // -----------------------------------
    const averageATS = interviews.length > 0

        ?

        Math.round(

            interviews.reduce(

                (acc, item) => {

                    const score =

                        parseInt(
                            item.ats_score
                        ) || 0

                    return acc + score

                },

                0
            )

            /

            interviews.length
        )

        :

        0

    const totalCandidates =

        new Set(

            interviews.map(

                item =>
                    item.candidate_name
            )

        ).size

    const topRole = interviews.length > 0

        ?

        interviews[0].role

        :

        "-"

    // -----------------------------------
    // UI
    // -----------------------------------
    return (

        <div className="w-full min-h-screen bg-black text-white p-10">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-10">

                <div>

                    <h1 className="text-5xl font-black tracking-tight">

                        Recruiter

                        <span className="text-green-400 ml-2">

                            Dashboard

                        </span>

                    </h1>

                    <p className="text-zinc-500 mt-2">

                        AI Interview Analytics & Candidate Insights

                    </p>

                </div>

                {/* CLEAR BUTTON */}
                <button

                    onClick={
                        handleClearDashboard
                    }

                    className="bg-red-500 hover:bg-red-400 transition-all duration-200 px-6 py-4 rounded-2xl font-semibold shadow-lg shadow-red-500/20"
                >

                    🗑 Clear All

                </button>

            </div>

            {/* ANALYTICS */}
            <div className="grid grid-cols-4 gap-6 mb-10">

                {/* TOTAL */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-200">

                    <div className="text-zinc-500 text-sm mb-4">

                        Total Interviews

                    </div>

                    <div className="text-5xl font-black">

                        {interviews.length}

                    </div>

                </div>

                {/* ATS */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-200">

                    <div className="text-zinc-500 text-sm mb-4">

                        Average ATS

                    </div>

                    <div className="text-5xl font-black text-green-400">

                        {averageATS}%

                    </div>

                </div>

                {/* ROLE */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-200">

                    <div className="text-zinc-500 text-sm mb-4">

                        Top Role

                    </div>

                    <div className="text-3xl font-bold">

                        {topRole}

                    </div>

                </div>

                {/* CANDIDATES */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-200">

                    <div className="text-zinc-500 text-sm mb-4">

                        Candidates

                    </div>

                    <div className="text-5xl font-black">

                        {totalCandidates}

                    </div>

                </div>

            </div>

            {/* EMPTY STATE */}
            {
                interviews.length === 0 && (

                    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-20 text-center text-zinc-500 text-xl">

                        No interview records found 😴

                    </div>
                )
            }

            {/* TABLE */}
            {
                interviews.length > 0 && (

                    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">

                        {/* TABLE HEADER */}
                        <div className="grid grid-cols-5 bg-zinc-900 border-b border-zinc-800 px-8 py-5 font-semibold text-zinc-300">

                            <div>ID</div>

                            <div>Candidate</div>

                            <div>Role</div>

                            <div>ATS Score</div>

                            <div>Evaluation</div>

                        </div>

                        {/* TABLE BODY */}
                        <div>

                            {
                                interviews.map((item) => (

                                    <div

                                        key={item.id}

                                        className="grid grid-cols-5 px-8 py-6 border-b border-zinc-900 hover:bg-zinc-900/50 transition-all duration-200"
                                    >

                                        {/* ID */}
                                        <div className="text-zinc-500">

                                            #{item.id}

                                        </div>

                                        {/* NAME */}
                                        <div className="font-semibold">

                                            {item.candidate_name}

                                        </div>

                                        {/* ROLE */}
                                        <div className="text-zinc-400">

                                            {item.role}

                                        </div>

                                        {/* ATS */}
                                        <div>

                                            <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-xl text-sm font-semibold">

                                                {item.ats_score}

                                            </span>

                                        </div>

                                        {/* EVALUATION */}
                                        <div className="text-zinc-400 text-sm leading-7 whitespace-pre-wrap">

                                            {item.evaluation}

                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default Dashboard