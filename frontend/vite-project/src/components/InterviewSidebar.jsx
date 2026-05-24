function InterviewSidebar({

    interviewHistory,

    onNewInterview,

    onSelectInterview,

    onOpenDashboard,

    onDeleteInterview
}) {

    return (

        <div className="w-[320px] h-screen bg-zinc-950 border-r border-zinc-800 text-white flex flex-col p-5 overflow-y-auto">

            {/* LOGO */}
            <div className="mb-6">

                <h1 className="text-4xl font-black tracking-tight">

                    Hirely

                    <span className="text-green-400">
                        AI
                    </span>

                </h1>

                <p className="text-zinc-500 text-sm mt-1">

                    AI Hiring Platform

                </p>

            </div>

            {/* NEW INTERVIEW */}
            <button

                onClick={onNewInterview}

                className="bg-green-500 hover:bg-green-400 transition-all duration-200 text-white font-semibold py-4 rounded-2xl mb-4 shadow-lg shadow-green-500/20"
            >

                ➕ New Interview

            </button>

            {/* DASHBOARD */}
            <button

                onClick={onOpenDashboard}

                className="bg-zinc-900 hover:bg-zinc-800 transition-all duration-200 border border-zinc-800 text-white font-semibold py-4 rounded-2xl mb-8"
            >

                📊 Recruiter Dashboard

            </button>

            {/* TITLE */}
            <div className="flex items-center justify-between mb-4">

                <h2 className="text-lg font-semibold text-zinc-300">

                    Interview History

                </h2>

                <div className="text-xs bg-zinc-800 px-2 py-1 rounded-lg text-zinc-400">

                    {interviewHistory.length}

                </div>

            </div>

            {/* EMPTY */}
            {
                interviewHistory.length === 0 && (

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center text-zinc-500">

                        No interviews yet 😴

                    </div>
                )
            }

            {/* HISTORY */}
            <div className="flex flex-col gap-3">

                {
                    interviewHistory.map((item) => (

                        <div

                            key={item.id}

                            className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02]"
                        >

                            <div className="flex items-start justify-between gap-3">

                                {/* SESSION */}
                                <button

                                    onClick={() =>
                                        onSelectInterview(item)
                                    }

                                    className="flex-1 text-left"
                                >

                                    {/* NAME */}
                                    <div className="font-semibold text-white text-[15px]">

                                        {item.name}

                                    </div>

                                    {/* ROLE */}
                                    <div className="text-sm text-zinc-400 mt-1">

                                        {item.role}

                                    </div>

                                    {/* TIME */}
                                    <div className="text-xs text-zinc-500 mt-3">

                                        {item.timestamp}

                                    </div>

                                </button>

                                {/* DELETE */}
                                <button

                                    onClick={() =>
                                        onDeleteInterview(item.id)
                                    }

                                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-zinc-800 hover:bg-red-500 w-9 h-9 rounded-xl flex items-center justify-center"
                                >

                                    🗑️

                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default InterviewSidebar