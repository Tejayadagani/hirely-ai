import axios from "axios"

const api = axios.create({

    baseURL: "https://hirely-ai-backend.onrender.com"
})

export default api