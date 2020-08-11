const initState = {
    companies : []
}

const companyReducer = (state = initState , action) => {

    if(action.type == "CREATE_COMPANY_FULFILLED" ){
        
        return {
            ...state,
            companies : [...state.companies , action.payload]   
        }

    }else if(action.type == "FETCH_COMPANIES_FULFILLED"){
        return {
            ...state,
            companies : action.payload
        }
    }else if(action.type == "DELETE_COMPANY_FULFILLED"){
        return {
            ...state,
            companies : [ ...state.companies.filter(function(value){ return value.companyId != action.payload.companyId;}) ]
        }
    }else{
        return state
    }
}

export default companyReducer