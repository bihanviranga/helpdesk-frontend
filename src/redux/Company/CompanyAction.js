import Axios from 'axios'

export const fetchAllCompanies = () => {
    return dispatch =>{
        dispatch({
            type:"FETCH_COMPANIES",
            payload: new Promise((resolve , reject)=>{
                Axios.get('https://localhost:44351/Company/',{
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
 

export const createCompany = (company) => {
    return dispatch => {
        dispatch({
            type : "CREATE_COMPANY",
            payload : new Promise((resolve , reject) =>{
                Axios.post('https://localhost:44351/Company/' , company)
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

export const deleteCompany = (id) =>{
    alert(id)
    return dispatch => {
        dispatch({
            type : "DELETE_COMPANY",
            payload : new Promise((resolve , reject) =>{
                Axios.delete(`https://localhost:44351/Company/${id}`)
                .then(response => { 
                    const deletedCompany = response.data
                    resolve(deletedCompany)
                })
                .catch(err => {
                    const errMzg = err.message
                })
            })
        })
    }
}