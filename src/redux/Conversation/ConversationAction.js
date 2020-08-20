import Axios from 'axios'
import API_PATH from '../api'

export const fetchConvesations = (ticketId) => {
    return dispatch => {
        dispatch({
            type: "FETCH_CONVERSATIONS",
            payload: new Promise((resolve, reject) => {
                Axios.get(`${API_PATH}/Conversation/${ticketId}`, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
                })
                    .then(response => {
                        const conversation = response.data
                        resolve(conversation)
                    })
                    .catch(err => {
                        const errMzg = err.message
                    })
            })
        })
    }
}


export const createConversation = (conversation) => {
    conversation.CvSendDate = new Date() ;
    return dispatch => {
        dispatch({
            type: "CREATE_CONVERSATION",
            payload: new Promise((resolve, reject) => {
                Axios.post(`${API_PATH}/Conversation/`, conversation)
                    .then(response => {
                        const CreatedConversation = response.data
                        resolve(CreatedConversation)
                    })
                    .catch(err => {
                        const errMzg = err.message
                    })
            })
        })
    }
}

