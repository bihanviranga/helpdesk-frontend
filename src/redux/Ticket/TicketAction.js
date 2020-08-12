import Axios from "axios"
import API_PATH from '../api'

export const createTicket = (ticket) => {
    return () => {
        // If we are sending files, the backend has to
        // receive them [FromForm] instead of [FromBody].
        // To do that we need to send mutipart/form-data content.
        // That is why we have to use a FormData object instead of
        // the ticket json object.
        const formData = new FormData();
        Object.keys(ticket).forEach(key => {
            formData.append(key, ticket[key]);
        });
        console.log(ticket);
        console.log(formData);
        Axios.post(`${API_PATH}/Ticket/`, formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("Token"),
                'Content-Type': 'multipart/form-data'
            }
        })
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
                Axios.get(`${API_PATH}/Ticket/`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(response => {
                        const tickets = response.data
                        resolve(tickets)
                    })
                    .catch(err => {
                        const errorMsg = err.message
                    })
            })
        })
    }
}

export const fetchTicketById = (ticketId) => {


    return dispatch => {
        dispatch({
            type: "FETCH_TICKET_BY_ID",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Ticket/${ticketId}`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(response => {
                        const ticket = response.data
                        resolve(ticket)
                    })
                    .catch(err => {
                        const errorMsg = err.message
                    })
            })
        })
    }
}

export const deleteTicket = (ticketId) => {
    return dispatch => {
        dispatch({
            type: "DELETE_TICKET",
            payload: new Promise((resolve, reject) => {
                Axios.delete(`${API_PATH}/Ticket/${ticketId}`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(response => {
                        const ticket = response.data
                        resolve(ticketId)
                    })
                    .catch(err => {
                        const errorMsg = err.message
                    })
            })
        })
    }
}

export const updateTicket = (tkt) => {

    return dispatch => {
        dispatch({
            type: "UPDATE_TICKET",
            payload: new Promise((resolve, reject) => {
                Axios.put(`${API_PATH}/Ticket/`, tkt, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).then(response => {
                    const ticket = response.data
                    resolve(ticket)
                })
                    .catch(err => {
                        const errorMsg = err.message
                    })
            })
        })
    }
}
