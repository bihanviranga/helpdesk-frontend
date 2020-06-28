const initialState = {
    users:null
}

const userReducer = (state = initialState , action) => {
    if(action.type == "FETCH_USERS_SUCCESS_FULFILLED"){
        return {
            ...state,
            users : action.payload
        }
    }
    else{
        return state
    }
}

export default userReducer