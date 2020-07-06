const initialState = {
    users:[],
    user:null,
    userProfile : null
}

const userReducer = (state = initialState , action) => {

    if(action.type == "CREATE_USER_FULFILLED" ){
        
        return {
            ...state,
            users : [...state.users , action.payload]   
        }

    } 
    else if(action.type == "DELETE_USER_FULFILLED"){
      
         return {
                ...state,
                users : [ ...state.users.filter(function(value){ return value.userName != action.payload.userName;}) ]
        }
        
    }
    else if(action.type == "FETCH_USERS_SUCCESS_FULFILLED"){
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
    }else if(action.type == "GET_USER_BY_USER_NAME_FULFILLED" ){
        return {
            ...state,
            user : action.payload
        }
    }
    else{
        return state
    }
}

export default userReducer