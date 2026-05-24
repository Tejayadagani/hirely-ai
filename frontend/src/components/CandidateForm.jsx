import { useState } from "react"

function CandidateForm({

    onContinue,

    parsedData
}) {

    const [formData, setFormData] = useState({

        name:
            parsedData?.name || "",

        email:
            parsedData?.email || "",

        phone:
            parsedData?.phone || "",

        experience:
            parsedData?.experience || "",

        role: "",

        tech_stack:
            parsedData?.skills || ""
    })

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {

        // Validation
        for (const key in formData) {

            if (!formData[key]) {

                alert(
                    "Please fill all fields"
                )

                return
            }
        }

        onContinue(formData)
    }

    return (

        <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-[500px] text-white">

            <h2 className="text-3xl font-bold mb-6">

                Candidate Details
            </h2>

            <div className="space-y-4">

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800"
                />

                <input
                    type="text"
                    name="experience"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800"
                />

                <input
                    type="text"
                    name="role"
                    placeholder="Desired Role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800"
                />

                <input
                    type="text"
                    name="tech_stack"
                    placeholder="Tech Stack"
                    value={formData.tech_stack}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800"
                />

                <button
                    onClick={handleSubmit}
                    className="
                        w-full
                        bg-white
                        text-black
                        py-3
                        rounded-lg
                        font-semibold
                    "
                >

                    Continue
                </button>

            </div>

        </div>
    )
}

export default CandidateForm