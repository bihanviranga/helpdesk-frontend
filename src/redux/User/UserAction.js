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