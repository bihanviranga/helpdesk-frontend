const initialState = {
    closedTickets : null,
    openTickets : null,
    totalTickets : null,
    inprogressTickets : null
}

const dashboardReducer = (state = initialState, action) => {
    if(action.type == "FETCH_DASHBOARD_FULFILLED"){
        return{
            ...state,
            closedTickets : action.payload.closedTickets,
            openTickets : action.payload.openTickets,
            totalTickets : action.payload.totalTickets,
            inprogressTickets: action.payload.inprogress
        }
    }else{
        return state
    }

}

export default dashboardReducer