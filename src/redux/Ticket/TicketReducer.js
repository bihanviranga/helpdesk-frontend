// TODO: delete this testing data
const initialState = {
        tickets: [
                {
                        ticketId: "testtktid1",
                        tktSubject: "Testing ticket subject 1",
                        tktStatus: "testing status 1",
                        tktPriority: "testing priority 1",
                        tktContent: "Ticket content and images go here.".repeat(10),
                        companyId: "Company ID goes here",
                        productId: "Product ID goes here",
                        moduleId: "Module ID goes here",
                        brandId: "Brand ID goes here",
                        categoryId: "Category ID goes here",
                        tktCreatedBy: "Created By goes here",
                        tktAssignedTo: "Assigned To goes here",
                        tktCreatedDate: "Created date goes here",
                        tktClosedDate: "Closed date goes here",
                        tktReopenedDate: "Reopened date goes here",
                        tktFirstResponseDate: "First response date goes here",
                },
                {
                        ticketId: "testtktid2",
                        tktSubject: "Testing ticket subject 2",
                        tktStatus: "testing status 2",
                        tktPriority: "testing priority 2",
                        tktContent: "Ticket content and images go here 2.".repeat(10),
                        companyId: "Company ID goes here 2",
                        productId: "Product ID goes here 2",
                        moduleId: "Module ID goes here 2",
                        brandId: "Brand ID goes here 2",
                        categoryId: "Category ID goes here 2",
                        tktCreatedBy: "Created By goes here 2",
                        tktAssignedTo: "Assigned To goes here 2",
                        tktCreatedDate: "Created date goes here 2",
                        tktClosedDate: "Closed date goes here 2",
                        tktReopenedDate: "Reopened date goes here 2",
                        tktFirstResponseDate: "First response date goes here 2"
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
                case "FETCH_TICKET_BY_ID_FULFILLED":
                        return {
                                ...state,
                                tickets: state.tickets.concat(action.payload)
                        }
                default:
                        return state
        }

}

export default ticketReducer