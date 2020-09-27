import Axios from 'axios'
import API_PATH from '../api'

export const fetchDashboard = () => {
    return dispatch => {
        dispatch({
            type: "FETCH_DASHBOARD",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Dashboard/`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(response => {
                        const dashboard = response.data
                        resolve(dashboard)
                    })
                    .catch(err => {
                        const errMzg = err.message
                    })
            })
        })
    }
}