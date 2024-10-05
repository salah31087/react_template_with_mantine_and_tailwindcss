import { Route, Routes } from "react-router-dom";


export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}
