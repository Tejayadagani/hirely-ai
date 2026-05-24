import {

    BrowserRouter,

    Routes,

    Route

} from "react-router-dom"

import Home from "./pages/Home"

import RecruiterDashboard from "./pages/Dashboard"

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* MAIN APP */}
                <Route

                    path="/"

                    element={<Home />}
                />

                {/* DASHBOARD */}
                <Route

                    path="/dashboard"

                    element={
                        <RecruiterDashboard />
                    }
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App