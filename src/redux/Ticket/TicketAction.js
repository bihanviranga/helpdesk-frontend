import Axios from "axios"

export const createTicket = (ticket) => {
    return ()=>{
        Axios.post("https://localhost:44351/Ticket", ticket)
        .then(res=>{
            console.log(res.data)
        })
    }
}