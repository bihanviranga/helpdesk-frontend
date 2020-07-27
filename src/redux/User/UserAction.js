import Axios from "axios"
import API_PATH from '../api'
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";

export const createUser = (user) => {
    return dispatch => {
        dispatch({
            type: "CREATE_USER",
            payload: new Promise((resolve, reject) => {
                Axios.post(`${API_PATH}/User/Register`, user)
                    .then(res => {
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
    return dispatch => {
        dispatch({
            type: "DELETE_USER",
            payload: new Promise((resolve, reject) => {
                Axios.delete(`${API_PATH}/User/${user}`, {
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
    return dispatch => {
        dispatch({
            type: "FETCH_USERS",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/User/`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token")  }
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
    // const history =  useHistory()
    return dispatch => {
        dispatch({
            type: "LOGIN_USER",
            payload: new Promise((resolve, reject) => {
                Axios.post(`${API_PATH}/User/Login`, loginDetails)
                    .then(response => {
                        resolve(response.data)
                        // history.push({ pathname:  "/" })
                    })
                    .catch(err => {
                        const errMzg = err.message
                    })
            })
        })
    }
}

export const getUserByUserName = (userName) => {
    return dispatch => {
        dispatch({
            type: "GET_USER_BY_USER_NAME",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/user/${userName}`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).then(res => {
                    resolve(res.data)
                })
            })
        })
    }
}

export const logOutUser = () => {
    return {
        type: "LOGOUT_USER",
        payload: null
    }
}