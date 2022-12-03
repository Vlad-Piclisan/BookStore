import axios from "axios";
export const baseURL = "http://localhost:4000"
const axiosInstance = axios.create({ baseURL })
export const headers = {
    "Content-Type": "application/json",
}


const TOKEN_KEY = "TOKEN"

export const getToken = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }
    else {
        delete headers["Authorization"]
    }
    return token;
}

export const storeToken = (token) => {
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }
    else {
        delete headers["Authorization"]
    }

    localStorage.setItem(TOKEN_KEY, token)

}
export default axiosInstance

