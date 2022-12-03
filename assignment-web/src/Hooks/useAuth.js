import { useState, useEffect } from "react"
import { getToken, storeToken } from "../Services/Configs";
import { getCurrentUser } from "../Services/Auth";

export const useAuth = () => {

    const [user, setUser] = useState(); 
    useEffect(() => {
        (async function() {
            const token = getToken()
            if(token){
                try{
                    const user = await getCurrentUser();
                    setUser(user.data);
                }catch(err){
                    storeToken(null);
                    setUser(null); 
                }
            }else {
                setUser(null); 
            }
        })()
    },[]);
    return {
        user,
        setUser
    }
}