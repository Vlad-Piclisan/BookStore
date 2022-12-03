import { useState, useEffect } from "react"
import { getToken, storeToken } from "../Services/Configs";
import { getCurrentUser } from "../Services/Auth";

export const useAuth = () => {
    // o stare pt utilizator
    const [user, setUser] = useState(); // initial value => undefined
    // ceva logica sa refetchuie cand se incarca pagina
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
                // facem 
               // setez utilizatorul curent 
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