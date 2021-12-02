import axios from "axios";


export const signupApi=(data)=>{
    return( axios.post("/api/auth/createuser",data));
}

export const loginApi=(data)=>{
    return( axios.post("/api/auth/login",data));
}

export const getUser=async ()=>{
    return await axios.get("/api/auth/getuser",{
        headers:{
            token: localStorage.getItem("token")
        }
    });
}

export const getNotes=async ()=>{
    return await axios.get("/api/notes/fetchallnotes",{
        headers:{
            token: localStorage.getItem("token")
        }
    });
}
export const addNote=async (data)=>{
    return await axios.post("/api/notes/addnote",data,{
        headers:{
            token: localStorage.getItem("token")
        }
    });
}
export const updateNote=async (data)=>{
    return await axios.put(`/api/notes/updatenote/${data.id}`,data,{
        headers:{
            token: localStorage.getItem("token")
        }
    });
}

export const specificNote=async (data)=>{
   
    return await axios.get("/api/notes/fetchspecificnote",{
        headers:{
            token: localStorage.getItem("token")
        },
        params:{
            id: data
        }
    });
}
export const delNote=async (data)=>{
    return await axios.delete("/api/notes/deletenote",{
        headers:{
            token: localStorage.getItem("token")
        },
        params:{
            id: data
        }
    });
}

export const searchNote = (data)=>{ 
    return axios.get(`/api/notes/searchnote/${data}`,{ 
        headers:{ 
            token: localStorage.getItem("token") 
        } 
    }) 
} 
 
export const searchTag = (data)=>{ 
    return axios.get(`/api/notes/searchnote/${data}`, { 
        headers:{ 
            token: localStorage.getItem("token") 
        } 
    }) 
}