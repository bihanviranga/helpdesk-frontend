import Axios from "axios"
import API_PATH from '../api'

export const fetchModulesByComapnyId = (id) => {
    return dispatch => {
        dispatch({
            type: "FETCH_MODULES_BY_COMPANY_ID",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Module/Company/${id}`, {
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

export const fetchModules = () => {
    return dispatch => {
        dispatch({
            type: "FETCH_MODULES",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Module/`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        resolve([])
                    })
            })
        })
    }
}