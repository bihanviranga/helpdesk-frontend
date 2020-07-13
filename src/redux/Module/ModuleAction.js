import Axios from "axios"

export const fetchModulesByComapnyId = (id) => {
    return dispatch=>{
        dispatch({
            type:"FETCH_MODULES_BY_COMPANY_ID",
            payload : new Promise((resolve , reject) => {
                Axios.get(`https://localhost:44351/Module/GetModulesByCompanyId/${id}`)
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