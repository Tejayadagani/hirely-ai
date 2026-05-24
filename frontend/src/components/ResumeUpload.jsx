import { useState } from "react"

import api from "../api/api"

function ResumeUpload({

    onUploadSuccess
}) {

    const [file, setFile] = useState(null)

    const [loading, setLoading] = useState(false)

    const [message, setMessage] = useState("")

    const handleUpload = async () => {

        if (!file) {

            setMessage(
                "Please select a resume"
            )

            return
        }

        const formData = new FormData()

        formData.append("file", file)

        try {

            setLoading(true)

            const response = await api.post(

                "/upload-resume",

                formData
            )

            setMessage(
                response.data.message
            )

            // Pass uploaded file info
           onUploadSuccess({

    fileName:
        response.data.filename,

    resumeText:
        response.data.resume_text,

    parsedData:
        response.data.parsed_data
})

        } catch (error) {

            console.log(error)

            setMessage(
                "Upload failed ❌"
            )

        } finally {

            setLoading(false)
        }
    }

    return (

        <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-[500px]">

            <h1 className="text-5xl font-bold mb-4 text-center text-white">

                Hirely AI 🚀

            </h1>

            <p className="text-gray-400 text-center mb-8">

                AI Powered Interview Platform
            </p>

            {/* FILE INPUT */}
            <div className="mb-6">

                <input

                    type="file"

                    onChange={(e) =>

                        setFile(
                            e.target.files[0]
                        )
                    }

                    className="
                        w-full
                        border
                        border-gray-700
                        rounded-lg
                        p-3
                        bg-zinc-800
                        text-white
                    "
                />

            </div>

            {/* BUTTON */}
            <button

                onClick={handleUpload}

                disabled={loading}

                className="
                    w-full
                    bg-white
                    text-black
                    font-semibold
                    py-3
                    rounded-lg
                    hover:bg-gray-300
                    transition
                "
            >

                {
                    loading

                    ? "Uploading..."

                    : "Upload Resume"
                }

            </button>

            {/* MESSAGE */}
            {
                message && (

                    <div className="mt-6 text-center text-white">

                        {message}

                    </div>
                )
            }

        </div>
    )
}

export default ResumeUpload