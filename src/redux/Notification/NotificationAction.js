import Axios from "axios"
import API_PATH from '../api'

export const fetchNotifications = (userId) => {
 
    return dispatch => {
        dispatch({
            type: "FETCH_NOTIFICATIONS_BY_USER_ID",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/notification/user/${userId}`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(res => {
                        resolve(res.data);

                    })
                    .catch(err => {
                        if (err.response.data == "Not Found") {
                            resolve([])
                        }
                    })
            })
        })
    }
}

export const markNotification = (id) => {
 alert(id)
    return dispatch => {
        dispatch({
            type: "MARK_NOTIFICATION",
            payload: new Promise((resolve, reject) => {
                Axios.put(`${API_PATH}/notification/${id}`, {"NotifRead": true} ,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(res => {
                       

                    })
                    .catch(err => {
                        if (err.response.data == "Not Found") {
                            alert(err.response.data)
                        }
                    })
            })
        })
    }
}
