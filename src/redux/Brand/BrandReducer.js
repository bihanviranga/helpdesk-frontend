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
    }else{
        return state
    }
    
}

export default brandReducer