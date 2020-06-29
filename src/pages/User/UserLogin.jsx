import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { loginUser } from '../../redux'

function UserLogin() {
    const dispatch = useDispatch();
    const intLoginDetails = {
        UserNameOrEmail:null,
        password:null
    }

    const [LoginDetails , setLoginDetails] = useState(intLoginDetails);


    return (
        <div>
            <form>
                <input type="text" name="UserNameOrEmail" placeholder="User Name" onChange={e=>  setLoginDetails({ ...LoginDetails , UserNameOrEmail : e.target.value })}/>
                <input type="password" name="password" placeholder="password" onChange={e=>  setLoginDetails({ ...LoginDetails , password : e.target.value })}/>
                <button onClick={(e)=>{
                    dispatch(loginUser(LoginDetails))
                    e.preventDefault();
                }}>Login</button>
            </form>
        </div>
    )
}

export default UserLogin
