import axiosInstance , {headers} from "./Configs";

export const getAllBooks=()=>{
    return axiosInstance.get("/books",{headers})
}
export const createBook=(payload)=>{
    let copyHeaders = {
        ...headers,
        'Content-Type': 'multipart/form-data'
    }

    return axiosInstance.post("/books",payload,{headers: copyHeaders})
}
export const updateBook=(payload,id)=>{
    let copyHeaders = {
        ...headers,
        'Content-Type': 'multipart/form-data'
    }
    return axiosInstance.put(`/books/${id}`,payload,{headers:copyHeaders})
}
export const deleteBook=(id)=>{
    return axiosInstance.delete(`/books/${id}`,{headers})
}

export const getBookById = id => axiosInstance.get(`/books/${id}`,{headers}); 

