const initialState = {
    notifications : [],
    productsOfSelectedCompany : []
}

const notificationReducer = (state = initialState , action) => {
    if(action.type == "FETCH_NOTIFICATIONS_BY_USER_ID_FULFILLED"){
        return {
            ...state,
            notifications : action.payload
        }
    }else{
        return state
    }
    
}

export default notificationReducer