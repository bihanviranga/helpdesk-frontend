const initialState = {
    ReduxCheck : 'reduxChechDone',
    posts:"No post yet"
}

const exampleReducer = (state = initialState , action) => {
    if(action.type == "CHANGE_DATA_FULFILLED"){
        return {
            ...state,
            ReduxCheck : action.payload
        }
    }
    if(action.type == "FETCH_POSTS_SUCCESS_FULFILLED"){
        return {
            ...state,
            posts : action.payload
        }
    }else{
        return state
    }
}

export default exampleReducer