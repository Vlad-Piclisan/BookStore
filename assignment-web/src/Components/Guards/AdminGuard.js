import React from "react";
import {Navigate} from "react-router-dom"
import {useAuthContext} from "../../Hooks/Contexts/authContext"
export const AdminGuard = ({children}) => {
    const {user} = useAuthContext();
    if(!user || user && !user.isAdmin){
        return <Navigate to="/" />
    }

    return <>{children}</>
}