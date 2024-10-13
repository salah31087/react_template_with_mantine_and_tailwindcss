import { useState } from "react";
import { useMutation } from 'react-query';
import axiosInstance from "../configs/axios";


const handleRegisterError = (error) => {
    if (error.response) {
        const status = error.response.status;
        if (status === 400) {
            return (error.response.data.message || 'Invalid input');
        } else if (status === 409) {
            return 'User already exists';
        } else {
            return (`Error ${status}: ${error.response.data.message || 'Signup failed'}`);
        }
    } else if (error.request) {
        return 'No response from server. Please check your network connection.';
    } else {
        return error.message;
    }
};

const handleRegister = async (username, email, password, csrf, apiEndpoint = '/auth/signup', withCredentials = true) => {
    const response = await axiosInstance.post(apiEndpoint, { username, email, password }, {
        withCredentials: withCredentials,
        headers: { 'XSRF-TOKEN': csrf }
    });
    return response.data;
};




const useRegister = (csrf, apiEndpoint = '/auth/signup', withCredentials = true, auth, setAuth) => {
    const [errMsg, setErrMsg] = useState('');
    const { mutateAsync, isLoading, error, data } = useMutation(
        ({ username, email, password }) => handleRegister(username, email, password, csrf, apiEndpoint, withCredentials),
        {
            onSuccess: () => setAuth(true),
            onError: (error) => {
                const errorMessage = handleRegisterError(error);
                console.error('Signup Error:', errorMessage);
                setErrMsg(errorMessage);
                setTimeout(() => {
                    setErrMsg('');
                }, 3000);
                setAuth(false);
            }
        }
    );
    return { mutateAsync, isLoading, error, data, errorMessage: errMsg };
};



export default useRegister