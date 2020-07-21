import Axios from "axios"

export const fetchProductsByComapnyId = (id) => {
    return dispatch=>{
        dispatch({
            type:"FETCH_PRODUCTS_BY_COMPANY_ID",
            payload : new Promise((resolve , reject) => {
                Axios.get(`https://localhost:44351/Product/Company/${id}`,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
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

export const fetchProducts = () => {
    return dispatch => {
        dispatch({
            type : "FETCH_PRODUCTS",
            payload : new Promise((resolve , reject) => {
                Axios.get(`https://localhost:44351/Product/`,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
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