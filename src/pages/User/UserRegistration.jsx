import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createUser } from '../../redux'

function UserRegistration() {
    const dispatch = useDispatch();
    const initUser = {
        CompanyId : "ca893",
        UserType : null,
        FullName : null,
        Email : null,
        Phone : null,
        UserImage : null,
        UserRole : null,
        Password : null,
        ConfirmPassword : null
    }

    const [user , setUser] = useState(initUser);

    return (
        <div>
            <h3>User Registration</h3>
            <form >
                <label htmlFor="">Full Name : </label>
                <input type="text" name="FullName" placeholder="Full Name" onChange={e=>  setUser({ ...user , FullName : e.target.value })} /><br/>
                
                <label htmlFor="">Email : </label>
                <input type="text" name="Email" placeholder="Email" onChange={e=>  setUser({ ...user , Email : e.target.value })}/><br/>
            
                <label htmlFor="">User Role : </label>
                <select name="UserRole" onChange={e=>  setUser({ ...user , UserRole : e.target.value })} >
                    <option value="Manager">Manager</option>
                    <option value="CEO">CEO</option>
                </select><br/>
                
                <label htmlFor="">User Type : </label>
                <select name="UserType" onChange={e=>  setUser({ ...user , UserType : e.target.value })} >
                    <option value="Clien">Clien</option>
                    <option value="Customer">Customer</option>
                </select><br/>
                
                <label htmlFor="">Phone : </label>
                <input type="text" name="Phone" placeholder="Phone Number" onChange={e=>  setUser({ ...user , Phone : e.target.value })} /><br/>
                
                <label htmlFor="">User Image : </label>
                <input type="file"  name="UserImage" placeholder="User Image" onChange={e=>  setUser({ ...user , UserImage : e.target.value })} /><br/>
                
                <label htmlFor="">Password : </label>
                <input type="password" name="Password" placeholder="Password" onChange={e=>  setUser({ ...user , Password : e.target.value })} /><br/>
                
                <label htmlFor="">Confirm Password : </label>
                <input type="password" name="ConfirmPassword" placeholder="Confirmed Password" onChange={e=>  setUser({ ...user , ConfirmPassword : e.target.value })} /><br/>
                
                <button onClick={(e)=>{
                    e.preventDefault();
                    dispatch(createUser(user))
                }}>Register</button>
            </form>
        </div>
    )
}

export default UserRegistration
