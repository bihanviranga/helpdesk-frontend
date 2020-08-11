const initialState = {
    modules : [],
    modulesOfSelectedCompany : []
}

const moduleReducer = (state = initialState , action) => {
    if(action.type == "FETCH_MODULES_BY_COMPANY_ID_FULFILLED"){
        return {
            ...state,
            modulesOfSelectedCompany : action.payload
        }
    }else if(action.type == "FETCH_MODULES_FULFILLED"){
        return { 
            ...state,
            modules : action.payload
         }
    }else if(action.type == "CREATE_MODULE_FULFILLED"){
        return{
            ...state,
            modules:[...state.modules , action.payload]
        }
    }else if(action.type == "DELETE_MODULE_FULFILLED"){
        return{
            ...state,
            modules : [ ...state.modules.filter(function(value){ return value.moduleId != action.payload.moduleId;}) ]
        }
    }else if(action.type == "UPDATE_MODULE_FULFILLED"){
        return{
            ...state,
            modules : [ ...state.modules.map(function(value){ if(value.moduleId == action.payload.moduleId && value.companyId == action.payload.companyId){
                return action.payload
            }else { return value } }) ]
        }
    }else{
        return state
    }
    
}

export default moduleReducer