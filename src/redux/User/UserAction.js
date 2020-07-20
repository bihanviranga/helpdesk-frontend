import Axios from "axios"

export const createUser = (user) => {
    return dispatch=>{
        dispatch({
            type:"CREATE_USER",
            payload : new Promise((resolve , reject) => {
                Axios.post("https://localhost:44351/User/Register",user)
                .then(res=>{
                    resolve(res.data)
                })
                .catch(err => {
                    const errMzg = err.message
                })
            })
        })
    }
}


export const deleteUser = (user) => {
    return dispatch =>{
        dispatch({
            type:"DELETE_USER",
            payload: new Promise((resolve , reject)=>{
                Axios.delete(`https://localhost:44351/User/${user}`,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                .then(response => {
                    const users = response.data
                    resolve(users)
                })
                .catch(err => {
                    const errMzg = err.message
                })
            })
        })
    }
}


export const fetchAllUsers = () => {
    return dispatch =>{
        dispatch({
            type:"FETCH_USERS",
            payload: new Promise((resolve , reject)=>{
                Axios.get('https://localhost:44351/User/' , {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                .then(response => {
                    console.log(response)
                    resolve(response.data)

                })
                .catch(err => {
                    
                    resolve(err.response.data)
                    
                })
            })
        })
    }
}

export const loginUser = (loginDetails) => {
    return dispatch => {
        dispatch({
            type:"LOGIN_USER",
            payload : new Promise((resolve , reject)=>{
                Axios.post("https://localhost:44351/User/Login" , loginDetails)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    const errMzg = err.message
                })
            })
        })
    }
}

export const getUserByUserName = (userName) =>{
    return dispatch => {
        dispatch({
            type : "GET_USER_BY_USER_NAME",
            payload : new Promise ((resolve , reject) => {
                Axios.get(`https://localhost:44351/user/${ userName }` , {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
            }).then(res => {
                resolve(res.data)
            })
            })
        })
    }
}

export const logOutUser = () => {
    return  {
        type : "LOGOUT_USER",
        payload : null
    }
}