function InterviewMode({

    onSelectMode
}) {

    return (

        <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-[700px] text-white">

            <h1 className="text-4xl font-bold text-center mb-10">

                Select Interview Mode 🎯
            </h1>

            <div className="grid grid-cols-2 gap-6">

                {/* CHAT MODE */}
                <div
                    onClick={() =>
                        onSelectMode("chat")
                    }
                    className="
                        bg-zinc-800
                        p-8
                        rounded-2xl
                        cursor-pointer
                        hover:bg-zinc-700
                        transition
                    "
                >

                    <h2 className="text-2xl font-bold mb-4">

                        💬 Chat Interview
                    </h2>

                    <p className="text-gray-400">

                        Answer questions using text chat interaction.
                    </p>

                </div>

                {/* AUDIO MODE */}
                <div
                    onClick={() =>
                        onSelectMode("audio")
                    }
                    className="
                        bg-zinc-800
                        p-8
                        rounded-2xl
                        cursor-pointer
                        hover:bg-zinc-700
                        transition
                    "
                >

                    <h2 className="text-2xl font-bold mb-4">

                        🎙️ Audio Interview
                    </h2>

                    <p className="text-gray-400">

                        Speak answers using voice interaction.
                    </p>

                </div>

            </div>

        </div>
    )
}

export default InterviewMode