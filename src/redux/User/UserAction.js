import Axios from "axios"

export const createUser = (user) => {
    return ()=>{
        Axios.post("https://localhost:44351/User/Register",user)
        .then(res=>{
            console.log(res.data)
        })
    }
}

export const fetchAllUsers = () => {
    return dispatch =>{
        dispatch({
            type:"FETCH_USERS_SUCCESS",
            payload: new Promise((resolve , reject)=>{
                Axios.get('https://localhost:44351/User/')
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

export const getProfile = () =>{
    return dispatch => {
        dispatch({
            type : "GET_PROFILE",
            payload : new Promise ((resolve , reject) => {
                Axios.get("https://localhost:44351/user/GetProfile", {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
            }).then(res => {
                resolve(res.data)
            })
            })
        })
    }
}

export const getUserByUserName = () =>{
    return dispatch => {
        dispatch({
            type : "GET_USER_BY_USER_NAME",
            payload : new Promise ((resolve , reject) => {
                Axios.get(`https://localhost:44351/user/${ JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName }` , {
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