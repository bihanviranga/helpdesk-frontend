import Axios from "axios"
import API_PATH from '../api'

export const fetchModulesByComapnyId = (id) => {
    return dispatch => {
        dispatch({
            type: "FETCH_MODULES_BY_COMPANY_ID",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Module/Company/${id}`, {
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

export const fetchModules = () => {
    return dispatch => {
        dispatch({
            type: "FETCH_MODULES",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Module/`, {
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

export const createModule = (newModule) => {
    return dispatch => {
        dispatch({
            type : "CREATE_MODULE",
            payload : new Promise((resolve , reject) => {
                Axios.post(`${API_PATH}/Module/`, newModule ,{
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

export const deleteModule = (moduleId , companyId) => {
    return dispatch => {
        dispatch({
            type : "DELETE_MODULE",
            payload : new Promise((resolve , reject)=>{
                Axios.delete(`${API_PATH}/Module/${moduleId}/${companyId}`,{
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).
                then(res => {
                    resolve(res.data)
                }).
                catch(err => {
                    if(err.response.status == 400){
                        alert("Can not delete modules that are refernced by tickets ?")
                    }
                })
            })
        })
    }
}

export const updateModule = (updatedModule) => {
   
    return dispatch => {
        dispatch({
            type : "UPDATE_MODULE",
            payload : new Promise((resolve , reject)=>{
                Axios.patch(`${API_PATH}/Module/`, updatedModule ,{
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