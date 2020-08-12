// TODO: delete this testing data
const initialState = {
        tickets: [ ]
}

const ticketReducer = (state = initialState, action) => {
        
                if( action.type == "CREATE_TICKET_FULFILLED" ) {
                        return{
                                ...state ,
                                tickets : [...state.tickets , action.payload  ]
                        }
                }else if( action.type == "FETCH_TICKETS_FULFILLED" ) {
                        return {
                                ...state,
                                tickets: action.payload
                        }
                }else if( action.type == "FETCH_TICKET_BY_ID_FULFILLED" ) {
                        return {
                                ...state,
                                tickets: state.tickets.concat(action.payload)
                        }
                }else if( action.type == "DELETE_TICKET_FULFILLED" ) {
                        return{
                                ...state,
                                tickets : [ ...state.tickets.filter(function(value){ return value.ticketId != action.payload;}) ]
                        }
                }else{
                        return state
                }
                

}

export default ticketReducer