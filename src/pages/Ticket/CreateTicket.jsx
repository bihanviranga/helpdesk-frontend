import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createTicket } from '../../redux'

function CreateTicket() {

    const dispatch = useDispatch();
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
        TktCreatedBy : "cwom",
        TktAssignedTo : "ckw",
        TktCreatedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktClosedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktReopenedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktFirstResponseDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktAttachment : "ckjw",
        TktRating : "99"
    }

    const [ticket , setTicket] = useState(initTicket);

    const _userReducer = useSelector(state=>state.user)
    useEffect(()=>{
        // dispatch(fetchAllUsers())
        return()=>{

        }
    },[])

    return (
        <div>
            <h3>Create Ticket</h3>
            {localStorage.getItem('Token')}
            <div>
                <form action="">
                    <label htmlFor="">Ticket Subject : </label>
                    <input type="text" name="TktSubject" placeholder="Tkt Subject" onChange={e=>  setTicket({ ...ticket , TktSubject : e.target.value })} /><br/>
                    <label htmlFor="">Ticket Content : </label>
                    <input type="text" name="TktContent" placeholder="Tkt Content" onChange={e=>  setTicket({ ...ticket , TktContent : e.target.value })} /><br/>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        dispatch(createTicket(ticket))
                    }} >Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTicket
