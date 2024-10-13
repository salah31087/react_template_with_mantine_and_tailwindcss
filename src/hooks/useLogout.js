import axiosInstance from "../configs/axios"; // Import axios directly if you don't need the instance
import { useMutation } from "react-query";

const handleLogoutError = (error) => {
    if (error.response) {
        return error.response.data.message || 'Logout failed';
    } else if (error.request) {
        return 'No response from server. Please check your network connection.';
    } else {
        return error.message;
    }
};

const handleLogout = async (apiEndpoint = '/auth/logout', withCredentials = true) => {
    const response = await axiosInstance.post(apiEndpoint, {}, {
        withCredentials: withCredentials,
    });
    return response.data; // You might want to return this or some relevant data
};

const useLogout = (setAuth) => {
    const { mutateAsync, isLoading, error } = useMutation(
        () => handleLogout(),
        {
            onSuccess: () => {
                setAuth(false); // Clear authentication state
                console.log('Logout successful');
            },
            onError: (error) => {
                const errorMessage = handleLogoutError(error);
                console.error('Logout Error:', errorMessage);
            }
        }
    );

    return { mutateAsync, isLoading, error };
};

export default useLogout;
