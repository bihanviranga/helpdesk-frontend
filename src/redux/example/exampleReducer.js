const initialState = {
    ReduxCheck : 'reduxChechDone'
}

const exampleReducer = (state = initialState , action) => {
    if(action.type == "CHANGE_DATA"){
        return {
            ...state,
            ReduxCheck : action.payload
        }
    }else{
        return state
    }
}

export default exampleReducer