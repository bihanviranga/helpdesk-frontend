import Axios from "axios"
import API_PATH from '../api'

export const createTicket = (ticket) => {
    return dispatch => {
        // If we are sending files, the backend has to
        // receive them [FromForm] instead of [FromBody].
        // To do that we need to send mutipart/form-data content.
        // That is why we have to use a FormData object instead of
        // the ticket json object.
        const formData = new FormData();
        Object.keys(ticket).forEach(key => {
            formData.append(key, ticket[key]);
        });

        dispatch({
            type: "CREATE_TICKET",
            payload: new Promise((resolve, reject) => {
                Axios.post(`${API_PATH}/Ticket/`, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("Token"),
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    resolve(res.data)
                })
            })
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

export const getTicketAttachment = (ticketId, ticketAttachmentName) => {
    return dispatch => {

        dispatch({
            type: "GET_TICKET_ATTACHMENT",
            payload: new Promise((resolve, reject) => {
                Axios({
                    url: `${API_PATH}/Ticket/${ticketId}/attachment`,
                    method: 'GET',
                    responseType: 'blob',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("Token"),
                    },
                }).then(response => {
                    const attachment = response.data
                    // Below code is from StackOverflow. Don't trust it. --bv
                    var fileURL = window.URL.createObjectURL(new Blob([attachment]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', `${ticketAttachmentName}`);
                    fileLink.target = '_blank';
                    document.body.appendChild(fileLink);
                    fileLink.click();
                    // window.URL.revokeObjectURL(fileURL);
                })
                    .catch(err => {
                        const errorMsg = err.message
                    })
            })
        })
    }
}

export const AssigningUser = (assigningData) => {
    return dispatch => {
        dispatch({
            type: "ASSIGNING_USER",
            payload: new Promise((resolve, reject) => {
                Axios.post(`${API_PATH}/Ticket/Assigning`, assigningData, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).then(response => {
                    resolve(response.data)
                })
                    .catch(err => {
                        if (err.response.status == 401) {
                            alert(err.response.data)
                        } else if (err.response.status == 404) {
                            alert(err.response.data)
                        }
                    })
            })
        })
    }
}

