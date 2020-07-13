import Axios from "axios"

export const fetchProductsByComapnyId = (id) => {
    return dispatch=>{
        dispatch({
            type:"FETCH_PRODUCTS_BY_COMPANY_ID",
            payload : new Promise((resolve , reject) => {
                Axios.get(`https://localhost:44351/Product/GetProductsByCompanyId/${id}`)
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