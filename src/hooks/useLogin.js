import { useState } from "react";
import { useMutation } from 'react-query';
import axiosInstance from "../configs/axios";

//! Helper function to handle errors
const handleLoginError = (error) => {
    if (error.response) {
        const status = error.response.status;
        if (status === 401) {
            return 'Invalid email or password';
        } else if (status === 403) {
            return 'Access denied';
        } else {
            return error.response.data.message || 'An error occurred';
        }
    } else if (error.request) {
        return 'No response from server. Please check your network connection.';
    } else {
        return error.message;
    }
};

//! Main login function
const handleLogin = async (email, password, csrf, apiEndpoint = '/auth/login', withCredentials = true) => {
    const response = await axiosInstance.post(apiEndpoint, { email, password }, {
        withCredentials: withCredentials,
        headers: { 'XSRF-TOKEN': csrf }
    });

    return response.data;
};

//! Optimized useLogin hook
const useLogin = (csrf = false, apiEndpoint = '/auth/login', withCredentials = true, auth, setAuth) => {
    const [errMsg, setErrMsg] = useState('')
    const { mutateAsync, isLoading, error, data, isSuccess } = useMutation(
        ({ email, password }) => handleLogin(email, password, csrf, apiEndpoint, withCredentials),
        {
            onSuccess: () => {
                setAuth(true)
                console.log('Login successful');
            },
            onError: (error) => {
                const errorMessage = handleLoginError(error);
                console.error('Login Error:', errorMessage);
                setErrMsg(errorMessage);
                setTimeout(() => {
                    setErrMsg('');
                }, 3000);
                setAuth(false);
            }
        }
    );

    return { mutateAsync, isLoading, error, data, errMsg, isSuccess };
};

export default useLogin;
