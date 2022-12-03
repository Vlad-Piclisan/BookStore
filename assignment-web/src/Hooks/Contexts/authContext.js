import React from "react";
import {useAuth} from "../useAuth"

const AuthContext = React.createContext(null);

export const useAuthContext = () => {
    return React.useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const auth= useAuth();
    if(typeof auth.user === "undefined"){
        return;
    }
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}