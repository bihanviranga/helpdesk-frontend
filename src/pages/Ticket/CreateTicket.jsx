import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { useHistory } from "react-router";
import { createTicket } from '../../redux'

function CreateTicket() {

    const dispatch = useDispatch();
    const history = useHistory();

    const _userReducer = useSelector(state=>state.user)
    const initTicket = {
        CompanyId : "ubhcsw",
        ProductId : "csooxqs",
        ModuleId : "cwdokm",
        BrandId : "cwkj",
        CategoryId : "cwkom",
        TktSubject : null,
        TktContent : null,
        TktStatus : "New Ticket",
        TktCreatedBy :JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName,
        TktCreatedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktAttachment : null
    }

    const [ticket , setTicket] = useState(initTicket);

    
    useEffect(()=>{
        //validate if user log or not
        if(localStorage.getItem("Token") == undefined){
            history.push({
                pathname:  "/UserLogin"
            })  
        }
        return()=>{

        }
    },[])

    return (
        <div>
            <h3>Create Ticket</h3>

            <div>
                <form action="">
                        
                    <label htmlFor="">Ticket Subject : </label>
                    <input type="text" name="TktSubject" placeholder="Tkt Subject" onChange={e=>  setTicket({ ...ticket , TktSubject : e.target.value })} /><br/>
                    
                    <label htmlFor="">Ticket Content : </label>
                    <input type="text" name="TktContent" placeholder="Tkt Content" onChange={e=>  setTicket({ ...ticket , TktContent : e.target.value })} /><br/>
                    <label htmlFor="">Attachment : </label>
                    <input type="File" name="TktSubject" placeholder="TktAttachment" onChange={e=>  setTicket({ ...ticket , TktAttachment : e.target.value })} /><br/>
                    
                    <button onClick={(e)=>{
                        e.preventDefault();
                       if(localStorage.getItem("Token") != null) {
                            dispatch(createTicket(ticket))
                        }else{
                            alert("logFirst")
                        }
                    }} >Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTicket
