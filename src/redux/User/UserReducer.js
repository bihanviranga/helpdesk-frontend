const initialState = {
    users:[],
    userProfile : null
}

const userReducer = (state = initialState , action) => {
    if(action.type == "FETCH_USERS_SUCCESS_FULFILLED"){
        return {
            ...state,
            users : action.payload
        }
    }else if(action.type == "LOGIN_USER_FULFILLED"){

        //storing token in localStorage ....
        localStorage.setItem('Token', action.payload)
        
        return { ...state }
    }else if(action.type == "LOGOUT_USER"){

        //remove token from localStorage ....
        localStorage.removeItem('Token')
 
        return { ...state }
    }else if(action.type == "GET_PROFILE_FULFILLED" ){
        return {
            ...state,
            userProfile : action.payload
        }
    }
    else{
        return state
    }
}

export default userReducer