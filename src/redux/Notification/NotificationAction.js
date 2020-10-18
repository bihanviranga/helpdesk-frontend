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
