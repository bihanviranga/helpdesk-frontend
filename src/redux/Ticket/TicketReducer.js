// TODO: delete this testing data
const initialState = {
        tickets: [
                {
                        tktId: "testtktid1",
                        tktSubject: "Testing ticket subject 1",
                        tktCategory: "Testing category 1",
                        tktStatus: "testing status 1",
                        tktPriority: "testing priority 1"
                },
                {
                        tktId: "testtktid2",
                        tktSubject: "Testing ticket subject 2",
                        tktCategory: "Testing category 2",
                        tktStatus: "testing status 2",
                        tktPriority: "testing priority 2"
                }

        ]
}

const ticketReducer = (state = initialState, action) => {
        switch (action.type) {
                case "FETCH_TICKETS_FULFILLED":
                        return {
                                ...state,
                                tickets: action.payload
                        }
                default:
                        return state
        }

}

export default ticketReducer