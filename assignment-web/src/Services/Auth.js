
import axiosInstance, { headers } from "./Configs";
export const register = (payload) => {
    return axiosInstance.post("/register", payload)
}

export const login =(payload)=>{
    return axiosInstance.post ("/login",payload,{headers})
}

export const getCurrentUser = () => {
    return axiosInstance.get("/current-user",{
        headers
    })
}
