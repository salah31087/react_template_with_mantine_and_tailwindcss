import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

export default function Login() {
    const value = useContext(AuthContext)

    return (
        <div>Login</div>
    )
}
