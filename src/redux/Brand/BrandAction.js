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

export const createBrand = (newBrand) => {
    return dispatch => {
        dispatch({
            type : "CREATE_BRAND",
            payload : new Promise((resolve , reject) => {
                Axios.post(`${API_PATH}/Brand/`, newBrand ,{
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

export const deleteBrand = (brandId , companyId) => {
    return dispatch => {
        dispatch({
            type : "DELETE_BRAND",
            payload : new Promise((resolve , reject)=>{
                Axios.delete(`${API_PATH}/Brand/${brandId}/${companyId}`,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).
                then(res => {
                    resolve(res.data)
                }).
                catch(err => {
                    if(err.response.status == 400){
                        alert("Can not delete brands that are refernced by tickets ?")
                    }
                })
            })
        })
    }
}

export const updateBrand = (updatedBrand) => {
   
    return dispatch => {
        dispatch({
            type : "UPDATE_BRAND",
            payload : new Promise((resolve , reject)=>{
                Axios.patch(`${API_PATH}/Brand/`, updatedBrand ,{
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