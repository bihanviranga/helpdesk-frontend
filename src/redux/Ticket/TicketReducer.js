// TODO: delete this testing data
const initialState = {
        tickets: [ ]
}

const ticketReducer = (state = initialState, action) => {
        switch (action.type) {
                case "FETCH_TICKETS_FULFILLED":

                        return {
                                ...state,
                                tickets: action.payload
                        }
                case "FETCH_TICKET_BY_ID_FULFILLED":
                        return {
                                ...state,
                                tickets: state.tickets.concat(action.payload)
                        }
                case "DELETE_TICKET_FULFILLED":
                        return{
                                ...state,
                                tickets : [ ...state.tickets.filter(function(value){ return value.ticketId != action.payload;}) ]
                        }
                default:
                        return state
        }

}

export default ticketReducer