function EvaluationDashboard({

    evaluation
}) {

    return (

        <div className="w-[900px] bg-zinc-900 rounded-2xl shadow-2xl p-10 text-white">

            <h1 className="text-5xl font-bold mb-10 text-center">

                Interview Evaluation 📊
            </h1>

            {/* SCORE */}
            <div className="mb-10">

                <div className="flex justify-between mb-2">

                    <span className="text-xl">

                        Overall Score
                    </span>

                    <span className="text-xl font-bold">

                        85%
                    </span>

                </div>

                <div className="w-full bg-zinc-700 rounded-full h-6">

                    <div
                        className="
                            bg-green-500
                            h-6
                            rounded-full
                        "
                        style={{ width: "85%" }}
                    />

                </div>

            </div>

            {/* AI FEEDBACK */}
            <div className="bg-zinc-800 p-8 rounded-2xl whitespace-pre-wrap leading-8 text-lg">

                {evaluation}

            </div>

        </div>
    )
}

export default EvaluationDashboards