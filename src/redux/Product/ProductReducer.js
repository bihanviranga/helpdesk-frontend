const initialState = {
    productsOfSelectedCompany : []
}

const productReducer = (state = initialState , action) => {
    if(action.type == "FETCH_PRODUCTS_BY_COMPANY_ID_FULFILLED"){
        return {
            ...state,
            productsOfSelectedCompany : action.payload
        }
    }else{
        return state
    }
    
}

export default productReducer