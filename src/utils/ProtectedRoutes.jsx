import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const token = false
    return token ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;