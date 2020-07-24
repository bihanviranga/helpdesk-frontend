import Axios from "axios"
import API_PATH from '../api'

export const fetchCategoriesByComapnyId = (id) => {
    return dispatch => {
        dispatch({
            type: "FETCH_CATEGORIES_BY_COMPANY_ID",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Category/Company/${id}`, {
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

export const fetchCategories = () => {
    return dispatch => {
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Category/`, {
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