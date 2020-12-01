const initialState = {
    users:[],
    errs : {
       fetchUserError : null, 
    },
    user:null,
    tktOwner : null,
    login : (localStorage.getItem("Token") != null ) ? true : false ,
    resetUser : null
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
    else if(action.type == "FETCH_USERS_FULFILLED"){
        if(action.payload == '401 Unauthorized  Access'){
            return {
                ...state ,
                errs : { ...state.errs , fetchUserError : action.payload }
            }
        }else{
            return {
                ...state,
                users : action.payload
            }
        }
        
    }else if(action.type == "LOGIN_USER_FULFILLED"){

        //storing token in localStorage ....
        localStorage.setItem('Token', action.payload)

        return {  ...state , login : true  }
    }else if(action.type == "LOGOUT_USER"){

        //remove token from localStorage ....
        localStorage.removeItem('Token')
 
        return {  ...state , login : false , user : null }
    }else if(action.type == "GET_USER_BY_USER_NAME_FULFILLED" ){
        return {
            ...state,
            user : action.payload
        }
    }else if(action.type == "GET_TKT_OWNER_BY_USER_NAME_FULFILLED" ){
        return {
            ...state,
            tktOwner : action.payload
        }
    }else if(action.type == "CHECK_RESET_PERMISSION_ADN_USER_AVAILABILITY_FULFILLED"){
        return{
            ...state,
            resetUser : action.payload
        }
    }else if( action.type == "MAKE_NULL_RESET_USER" ){
        return{
            ...state ,
             resetUser : null
        }
    }else{
        return state
    }
}

export default userReducer