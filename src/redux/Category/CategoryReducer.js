const initialState = {
    categoriesOfSelectedCompany : []
}

const categoryReducer = (state = initialState , action) => {
    if(action.type == "FETCH_CATEGORIES_BY_COMPANY_ID_FULFILLED"){
        return {
            ...state,
            categoriesOfSelectedCompany : action.payload
        }
    }else{
        return state
    }
    
}

export default categoryReducer