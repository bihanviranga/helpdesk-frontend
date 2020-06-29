import React , {useEffect , useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { fetchAllUsers } from '../../redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom'

function UserIndex() {
    const dispatch = useDispatch()
    const _userReducer = useSelector(state=>state.user)
    useEffect(()=>{
        dispatch(fetchAllUsers())
        return()=>{

        }
    },[])


    function Users(){
        if(_userReducer.users == null ){ return (<p>loading ...</p>) }
        else { 
           return (
                _userReducer.users.map((row)=>(
                    <TableRow key={row.companyId} >
                        <TableCell component="th" scope="row"> {row.userName} </TableCell>
                        <TableCell align="right">{row.companyId}</TableCell>
                        <TableCell align="right">{row.fullName}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.userRole}</TableCell>
                        <TableCell align="right">{row.userType}</TableCell>
                    </TableRow>
                    )
                ))  
            }
    }

    return (
        <div>
            <h3>Users</h3>
            <div><Button color="inherit" component={Link} to='/UserRegistration'>Register New User</Button></div>
            <div>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>fullName</b></TableCell>
                                <TableCell align="right"><b>Company Id</b></TableCell>
                                <TableCell align="right"><b>Full Name</b></TableCell>
                                <TableCell align="right"><b>Email</b></TableCell>
                                <TableCell align="right"><b>User Role</b></TableCell>
                                <TableCell align="right"><b>User Type</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Users />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default UserIndex
