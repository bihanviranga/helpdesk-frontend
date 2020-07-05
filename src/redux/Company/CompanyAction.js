import Axios from 'axios'

export const fetchAllCompanies = () => {
    return dispatch => {
        dispatch({
            type : "FETCH_ALL_COMPANIES",
            payload : new Promise((resolve , reject) =>{
                Axios.get('https://localhost:44351/Company/')
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