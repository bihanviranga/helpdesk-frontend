const initialState = {
    brands : [],
    brandsOfSelectedCompany : []
}

const brandReducer = (state = initialState , action) => {
    if(action.type == "FETCH_BRANDS_BY_COMPANY_ID_FULFILLED"){
        return {
            ...state,
            brandsOfSelectedCompany : action.payload
        }
    }else if(action.type == "FETCH_BRANDS_FULFILLED"){
        return { 
            ...state,
            brands : action.payload
         }
    }else if(action.type == "CREATE_BRAND_FULFILLED"){
        return{
            ...state,
            brands:[...state.brands , action.payload]
        }
    }else if(action.type == "DELETE_BRAND_FULFILLED"){
        return{
            ...state,
            brands : [ ...state.brands.filter(function(value){ return value.brandId != action.payload.brandId;}) ]
        }
    }else if(action.type == "UPDATE_BRAND_FULFILLED"){
        return{
            ...state,
            brands : [ ...state.brands.map(function(value){ if(value.brandId == action.payload.brandId && value.companyId == action.payload.companyId){
                return action.payload
            }else { return value } }) ]
        }
    }else{
        return state
    }
    
}

export default brandReducer