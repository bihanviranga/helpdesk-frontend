const initialState = {
    modules:[],
    modulesOfSelectedCompany : []
}

const moduleReducer = (state = initialState , action) => {
    if(action.type == "FETCH_MODULES_BY_COMPANY_ID_FULFILLED"){
        return {
            ...state,
            modulesOfSelectedCompany : action.payload
        }
    }else if(action.type == "FETCH_MODULES_FULFILLED"){
        return{
            ...state,
            modules : action.payload
        }
    }else{
        return state
    }
    
}

export default moduleReducer