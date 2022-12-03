import React from "react";
import {Navigate} from "react-router-dom"
import {useAuthContext} from "../../Hooks/Contexts/authContext"
export const AuthGuard = ({children}) => {
    const {user} = useAuthContext();
    if(!user){
        return <Navigate to="/" />
    }

    return <>{children}</>
}