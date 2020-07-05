const initState = {
    comapnies : []
}

const companyReducer = (state = initState , action) => {
    if(action.type == "FETCH_ALL_COMPANIES_FULFILLED"){
        return {
            ...state,
            comapnies : action.payload
        }
    }else{
        return { ...state }
    }
}

export default companyReducer