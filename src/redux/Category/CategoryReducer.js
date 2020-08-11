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
    }else if(action.type == "CREATE_CATEGORY_FULFILLED"){
        return{
            ...state,
            categories:[...state.categories , action.payload]
        }
    }else if(action.type == "DELETE_CATEGORY_FULFILLED"){
        return{
            ...state,
            categories : [ ...state.categories.filter(function(value){ return value.categoryId != action.payload.categoryId;}) ]
        }
    }else if(action.type == "UPDATE_CATEGORY_FULFILLED"){
        return{
            ...state,
            categories : [ ...state.categories.map(function(value){ if(value.categoryId == action.payload.categoryId && value.companyId == action.payload.companyId){
                return action.payload
            }else { return value } }) ]
        }
    }else{
        return state
    }
    
}

export default categoryReducer