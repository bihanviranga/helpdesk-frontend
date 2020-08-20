const initState = {
    conversations : []
}

const conversationReducer = (state = initState , action) => {

    if(action.type == "CREATE_CONVERSATION_FULFILLED" ){
        
        return {
            ...state,
            conversations : [...state.conversations , action.payload]   
        }

    }else if(action.type == "FETCH_CONVERSATIONS_FULFILLED"){
        return {
            ...state,
            conversations : action.payload
        }
    }else if(action.type == "DELETE_CONVERSATION_FULFILLED"){
        return {
            ...state,
            conversations : [ ...state.conversations.filter(function(value){ return value.cvId != action.payload.cvId;}) ]
        }
    }else{
        return state
    }
}

export default conversationReducer