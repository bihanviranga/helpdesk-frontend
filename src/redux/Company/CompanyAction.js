import Axios from 'axios'
import API_PATH from '../api'

export const fetchAllCompanies = () => {
    return dispatch => {
        dispatch({
            type: "FETCH_COMPANIES",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Company/`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(response => {
                        const companies = response.data 
                        resolve(companies)
                    })
                    .catch(err => {
                        const errMzg = err.message
                    })
            })
        })
    }
}


export const createCompany = (CompanyName) => {
    return dispatch => { 
        dispatch({
            type: "CREATE_COMPANY",
            payload: new Promise((resolve, reject) => {
                Axios.post(`${API_PATH}/Company/`, { CompanyName : CompanyName}, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(response => {
                        const CreatedCompany = response.data
                        resolve(CreatedCompany)
                    })
                    .catch(err => {
                        const errMzg = err.message
                    })
            })
        })
    }
}

export const deleteCompany = (id) => { 
    return dispatch => {
        dispatch({
            type: "DELETE_COMPANY",
            payload: new Promise((resolve, reject) => {
                Axios.delete(`${API_PATH}/Company/${id}` , {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(response => {
                        const deletedCompany = response.data
                        alert( response.data.companyName + " has been deleted !" )
                        resolve(deletedCompany)
                    })
                    .catch(error => {
                        alert( error.response.data )
                    })
            })
        })
    }
}