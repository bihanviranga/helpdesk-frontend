const initialState = {
    products : [],
    productsOfSelectedCompany : []
}

const productReducer = (state = initialState , action) => {
    if(action.type == "FETCH_PRODUCTS_BY_COMPANY_ID_FULFILLED"){
        return {
            ...state,
            productsOfSelectedCompany : action.payload
        }
    }else if(action.type == "FETCH_PRODUCTS_FULFILLED"){
        return { 
            ...state,
            products : action.payload
         }
    }else if(action.type == "CREATE_PRODUCT_FULFILLED"){
        return{
            ...state,
            products:[...state.products , action.payload]
        }
    }else if(action.type == "DELETE_PRODUCT_FULFILLED"){
        return{
            ...state,
            products : [ ...state.products.filter(function(value){ return value.productId != action.payload.productId;}) ]
        }
    }else if(action.type == "UPDATE_PRODUCT_FULFILLED"){
        return{
            ...state,
            products : [ ...state.products.map(function(value){ if(value.productId == action.payload.productId && value.companyId == action.payload.companyId){
                return action.payload
            }else { return value } }) ]
        }
    }else{
        return state
    }
    
}

export default productReducer