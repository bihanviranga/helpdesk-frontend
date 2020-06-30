const initialState = {
    users:null,
    currentUser : null
}

const userReducer = (state = initialState , action) => {
    if(action.type == "FETCH_USERS_SUCCESS_FULFILLED"){
        return {
            ...state,
            users : action.payload
        }
    }else if(action.type == "LOGIN_USER_FULFILLED"){

        //storing token in localStorage ....
        localStorage.setItem('Token', action.payload.token)
        return {
            ...state,
            currentUser : action.payload
        }
    }
    else{
        return state
    }
}

export default userReducer