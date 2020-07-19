import Axios from "axios"

export const createTicket = (ticket) => {
    return () => {
        Axios.post("https://localhost:44351/Ticket", ticket)
            .then(res => {
                console.log(res.data)
            })
    }
}

export const fetchAllTickets = () => {
    return dispatch => {
        dispatch({
            type: "FETCH_TICKETS",
            payload: new Promise((resolve, reject) => {
                Axios.get('https://localhost:5001/Ticket/')
                    .then(response => {
                        const tickets = response.data
                        resolve(tickets)
                    })
                    .catch(err => {
                        const errorMsg = err.message
                        console.log(errorMsg);
                    })
            })
        })
    }
}
