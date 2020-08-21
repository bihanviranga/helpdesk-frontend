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

export const createCategory = (newCategory) => {
    return dispatch => {
        dispatch({
            type : "CREATE_CATEGORY",
            payload : new Promise((resolve , reject) => {
                Axios.post(`${API_PATH}/Category/`, newCategory ,{
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

export const deleteCategory = (categoryId , companyId) => {
    return dispatch => {
        dispatch({
            type : "DELETE_CATEGORY",
            payload : new Promise((resolve , reject)=>{
                Axios.delete(`${API_PATH}/Category/${categoryId}/${companyId}`,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).
                then(res => {
                    resolve(res.data)
                }).
                catch(err => {
                    if(err.response.status == 400){
                        alert("Can not delete categories that are refernced by tickets ?")
                    }
                })
            })
        })
    }
}

export const updateCategory = (updatedCategory) => {
   
    return dispatch => {
        dispatch({
            type : "UPDATE_CATEGORY",
            payload : new Promise((resolve , reject)=>{
                Axios.patch(`${API_PATH}/Category/`, updatedCategory ,{
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