import Axios from "axios"
import API_PATH from '../api'

export const createTicket = (ticket) => {
    return () => {
        Axios.post(`${API_PATH}/Ticket/`, ticket)
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
                Axios.get(`${API_PATH}/Ticket/`)
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
