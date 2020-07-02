import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createTicket } from '../../redux'

function CreateTicket() {

    const dispatch = useDispatch();
    const _userReducer = useSelector(state=>state.user)
    const initTicket = {
        CompanyId : "ubhcsw",
        ProductId : "csooxqs",
        ModuleId : "cwdokm",
        BrandId : "cwkj",
        CategoryId : "cwkom",
        TktSubject : null,
        TktContent : null,
        TktStatus : "cwnj",
        TktPriority : "okmo",
        TktCreatedBy :_userReducer.userProfile.userName,
        TktAssignedTo : "ckw",
        TktCreatedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktClosedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktReopenedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktFirstResponseDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktAttachment : "ckjw",
        TktRating : "99"
    }

    const [ticket , setTicket] = useState(initTicket);

    
    useEffect(()=>{
        // dispatch(fetchAllUsers())
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
