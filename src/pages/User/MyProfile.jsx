import React , {useEffect , useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { useHistory } from "react-router";
import { getUserByUserName } from '../../redux'

function MyProfile() {
    const dispatch = useDispatch()
    const history = useHistory();
    
    const _userReducer = useSelector(state=>state.user)
    useEffect(()=>{

        //validate if user login or not
        if(localStorage.getItem("Token") == null){
            history.push({
                pathname:  "/UserLogin"
            })  
        }
      return()=>{
  
      }   
    },[])

    // component 
    function ProfileDataComponent (){
        if(_userReducer.user == null && localStorage.getItem("Token") != null){
            dispatch(getUserByUserName(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName))
            return ( <p> Loading ... ! </p> )
        }else{
            return ( <p> {JSON.stringify(_userReducer.user)} </p> )
        }
    }

    return (
        <div>
            My Profile
            <ProfileDataComponent />
        </div>
    )
}

export default MyProfile
