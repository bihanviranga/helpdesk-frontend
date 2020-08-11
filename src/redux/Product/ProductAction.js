import Axios from "axios"
import API_PATH from '../api'

export const fetchProductsByComapnyId = (id) => {
    return dispatch => {
        dispatch({
            type: "FETCH_PRODUCTS_BY_COMPANY_ID",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Product/Company/${id}`, {
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

export const fetchProducts = () => {
    return dispatch => {
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Product/`, {
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

export const createProduct = (newProduct) => {
    return dispatch => {
        dispatch({
            type : "CREATE_PRODUCT",
            payload : new Promise((resolve , reject) => {
                Axios.post(`${API_PATH}/Product/`, newProduct ,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).
                then(res => {
                    resolve(res.data)
                }).
                catch(err => {
                    resolve([])
                })
            })
        })
    }
}

export const deleteProduct = (productId , companyId) => {
    return dispatch => {
        dispatch({
            type : "DELETE_PRODUCT",
            payload : new Promise((resolve , reject)=>{
                Axios.delete(`${API_PATH}/Product/${productId}/${companyId}`,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).
                then(res => {
                    resolve(res.data)
                }).
                catch(err => {
                    resolve([])
                })
            })
        })
    }
}

export const updateProduct = (updatedProduct) => {
   
    return dispatch => {
        dispatch({
            type : "UPDATE_PRODUCT",
            payload : new Promise((resolve , reject)=>{
                Axios.patch(`${API_PATH}/Product/`, updatedProduct ,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).
                then( res => {
                  
                    resolve(res.data)
                }). 
                catch(err => {
                    resolve([])
                })
            })
        })
    }
} 