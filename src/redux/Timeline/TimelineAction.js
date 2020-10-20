import Axios from "axios"
import API_PATH from "../api"

export const getTicketTimeline = (ticketId) => {
    return dispatch => {
        dispatch({
            type: "FETCH_TICKET_TIMELINE",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Timeline/Ticket/${ticketId}`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                }).then(response => {
                    const data = {
                        ticketId: ticketId,
                        timeline: response.data
                    }
                    resolve(data);
                }).catch(err => {
                    const errorMsg = err.message;
                })
            })
        })
    }
}
