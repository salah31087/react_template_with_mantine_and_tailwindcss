import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";


/**
 * ProtectedRoutes is a route wrapper that checks if the user is authenticated
 * before allowing access to the wrapped route. If the user is not authenticated,
 * they are redirected to the login page.
 * @returns {React.ReactElement} The wrapped route element if the user is authenticated,
 * otherwise a redirect to the login page.
 */


const ProtectedRoutes = () => {
    const auth = useContext(AuthContext)
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;