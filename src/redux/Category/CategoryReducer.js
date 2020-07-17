const initialState = {
    categories : [],
    categoriesOfSelectedCompany : []
}

const categoryReducer = (state = initialState , action) => {
    if(action.type == "FETCH_CATEGORIES_BY_COMPANY_ID_FULFILLED"){
        return {
            ...state,
            categoriesOfSelectedCompany : action.payload
        }
    }else if(action.type == "FETCH_CATEGORIES_FULFILLED"){
        return {
            ...state,
            categories : action.payload
        }
    }else{
        return state
    }
    
}

export default categoryReducer