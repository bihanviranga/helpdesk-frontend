import Axios from "axios"

export const fetchCategoriesByComapnyId = (id) => {
    return dispatch=>{
        dispatch({
            type:"FETCH_CATEGORIES_BY_COMPANY_ID",
            payload : new Promise((resolve , reject) => {
                Axios.get(`https://localhost:44351/Category/Company/${id}`)
                .then(res=>{
                    resolve(res.data);
                    
                })
                .catch(err => {
                    if(err.response.data == "Not Found"){
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
            type : "FETCH_CATEGORIES",
            payload : new Promise((resolve , reject) => {
                Axios.get(`https://localhost:44351/Category/`)
                .then( res => {
                    resolve(res.data)
                } )
                .catch(err => {
                    resolve([])
                })
            })
        })
    }
}