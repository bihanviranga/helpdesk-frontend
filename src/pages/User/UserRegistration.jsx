import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createUser , fetchAllCompanies } from '../../redux'
import { useHistory } from "react-router";

function UserRegistration() {
    const dispatch = useDispatch();

    const _companyReducer = useSelector(state=>state.company)

    const initUser = {
        CompanyId : '',
        FullName : null,
        Email : null,
        Phone : null,
        UserImage : null,
        UserRole : '',
        UserType : '',
        Password : null,
        ConfirmPassword : null
    }
    const history = useHistory();
    const [user , setUser] = useState(initUser);

    const registerUser = (e) =>{
        e.preventDefault();
        if(user.UserRole.length > 0 && user.UserType.length > 0 && user.CompanyId.length > 0 ){
            dispatch(createUser(user))  
            history.push({
                pathname:  "/User"
                })
        }else{
            alert("fill all ")
        }
    }
    
    useEffect(()=>{
          if(_companyReducer.companies.length == 0){
            dispatch(fetchAllCompanies())
          }
        return()=>{
    
        }   
      },[])

    return (
        <div>
            {/* {JSON.stringify(user)} */}
            <h3>User Registration</h3>
            <form >
                <label htmlFor="">Full Name : </label>
                <input type="text" name="FullName" placeholder="Full Name" onChange={e=>  setUser({ ...user , FullName : e.target.value })} /><br/>
                
                <label htmlFor="">Email : </label>
                <input type="text" name="Email" placeholder="Email" onChange={e=>  setUser({ ...user , Email : e.target.value })}/><br/>
            
                <label htmlFor="">User Role : </label>
                <select name="UserRole" onChange={e=>  setUser({ ...user , UserRole : e.target.value })} >
                    <option value="">pleace select</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                </select><br/>
                
                <label htmlFor="">User Type : </label>
                <select defaultValue={{ label: "Select Dept", value: 0 }} name="UserType" onChange={e=>  setUser({ ...user , UserType : e.target.value })}>
                    <option value="">pleace select</option>
                    <option value="Clien">Clien</option>
                    <option selected value="HelpDesk">Help Desk</option>
                </select><br/>

                <label htmlFor="">User Comapny : </label>
                <select name="CompanyName" onChange={e=>  setUser({ ...user , CompanyId : e.target.value })} >
                    <option value="">pleace select</option>
                    {_companyReducer.companies.map((company)=>(
                        <option value={company.companyId}>{ company.companyName }</option>
                    ))}    
                </select>
                <br/>
                
                <label htmlFor="">Phone : </label>
                <input type="text" name="Phone" placeholder="Phone Number" onChange={e=>  setUser({ ...user , Phone : e.target.value })} /><br/>
                
                <label htmlFor="">User Image : </label>
                <input type="file"  name="UserImage" placeholder="User Image" onChange={e=>  setUser({ ...user , UserImage : e.target.value })} /><br/>
                
                <label htmlFor="">Password : </label>
                <input type="password" name="Password" placeholder="Password" onChange={e=>  setUser({ ...user , Password : e.target.value })} /><br/>
                
                <label htmlFor="">Confirm Password : </label>
                <input type="password" name="ConfirmPassword" placeholder="Confirmed Password" onChange={e=>  setUser({ ...user , ConfirmPassword : e.target.value })} /><br/>
                
                <button onClick={(e)=>{
                    registerUser(e)
                }}>Register</button>
            </form>
        </div>
    )
}

export default UserRegistration
