const initialState = {
    closedTickets : null,
    openTickets : null,
    totalTickets : null,
    inprogressTickets : null,
    companyDetails : null
}

const dashboardReducer = (state = initialState, action) => {
    if(action.type == "FETCH_DASHBOARD_FULFILLED"){
        console.log(action.payload)
        return{
            ...state,
            closedTickets : action.payload.closedTickets,
            openTickets : action.payload.openTickets,
            totalTickets : action.payload.totalTickets,
            inprogressTickets: action.payload.inprogress,
            companyDetails : action.payload.dashboardCompanyDeatails
        }
    }else{
        return state
    }

}

export default dashboardReducer