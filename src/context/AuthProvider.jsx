import { createContext, useEffect, useState } from "react";
import useCheckAuth from "../hooks/useCheckAuth";

const AuthContext = createContext({});

/**
 * AuthProvider wraps the app with an AuthContext Provider.
 * It initializes the user's authentication status by
 * calling the checkAuth mutation when the component mounts.
 * The user's authentication status is stored in the component's
 * state and is passed down to all components through the AuthContext.
 */

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const { mutateAsync } = useCheckAuth(setAuth);

    useEffect(() => {
        const checkUserAuth = async () => {
            await mutateAsync();
        };

        checkUserAuth();
    }, [mutateAsync]);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext