import Axios from "axios"
import API_PATH from '../api'

export const fetchBrandsByComapnyId = (id) => {
    return dispatch => {
        dispatch({
            type: "FETCH_BRANDS_BY_COMPANY_ID",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Brand/Company/${id}`, {
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

export const fetchBrands = () => {
    return dispatch => {
        dispatch({
            type: "FETCH_BRANDS",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Brand/`, {
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