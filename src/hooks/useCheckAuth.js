import axiosInstance from "../configs/axios";
import { useMutation } from "react-query";

// Function to handle errors during authentication checks
const handleAuthCheckError = (error) => {
    if (error.response) {
        const status = error.response.status;
        if (status === 401) {
            return 'Unauthorized: You are not logged in.';
        } else if (status === 403) {
            return 'Forbidden: You do not have the right permissions.';
        } else {
            return `Error ${status}: ${error.response.data.message || 'Something went wrong'}`;
        }
    } else if (error.request) {
        return 'No response from the server. Please check your network or try again later.';
    } else {
        return `Error setting up the request: ${error.message}`;
    }
};

// Function to check user authentication
const checkAuth = async () => {
    const response = await axiosInstance.get('/check-auth', { withCredentials: true });
    return response.data; // Return any data if needed
};

// Custom hook to manage authentication checks
const useCheckAuth = (setAuth) => {

    const { mutateAsync, isLoading, error, data } = useMutation(checkAuth, {
        onSuccess: () => {
            setAuth(true),
                console.log('Authentication check successful');
        },
        onError: (error) => {
            const errorMessage = handleAuthCheckError(error);
            console.error('Authentication Check Error:', errorMessage);
            setAuth(false);
        },
    });

    return { mutateAsync, isLoading, error, data };
};

export default useCheckAuth;
