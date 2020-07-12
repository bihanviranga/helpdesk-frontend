import React , {useEffect , useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { fetchAllUsers , deleteUser } from '../../redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//dialog box component
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {Link} from 'react-router-dom'

function UserIndex() {
    const dispatch = useDispatch()
    const _userReducer = useSelector(state=>state.user)
   
    const [open, setOpen] = useState(false);

    const initSelectedUser = {}
    const [selectedUser , setSelectedUser] = useState(initSelectedUser)

    // Component

    function UserRegistrarionButtonComponet(){
        if(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserRole == "Manager"){
            return( <Button color="inherit" component={Link} to='/UserRegistration'>Register New User</Button> )
        }else { return null }
    }

    function UserListComponent(){
        if(_userReducer.users.length == 0 && _userReducer.errs.fetchUserError == null ){
            dispatch(fetchAllUsers())
            return (
                <TableRow >
                    <TableCell component="th" scope="row"> Loading ... </TableCell>    
                </TableRow>
            ) }
            else if(_userReducer.errs.fetchUserError != null || JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserRole != "Manager"){
                return(
                    <TableRow >
                        <TableCell component="th" scope="row"> {_userReducer.errs.fetchUserError} </TableCell>    
                    </TableRow>
                )
            }
        else { 
           return (
                _userReducer.users.map((row)=>(
                    <TableRow key={row.userName} >
                        <TableCell component="th" scope="row"> 
                            <Button variant="outlined" color="primary" onClick={()=>{
                                setSelectedUser(row)
                                setOpen(true)
                            }}>
                                {row.userName}
                            </Button>
                        </TableCell>
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
            <div> <UserRegistrarionButtonComponet /> </div>
            <div>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>User Name</b></TableCell>
                                <TableCell align="right"><b>Company Id</b></TableCell>
                                <TableCell align="right"><b>Full Name</b></TableCell>
                                <TableCell align="right"><b>Email</b></TableCell>
                                <TableCell align="right"><b>User Role</b></TableCell>
                                <TableCell align="right"><b>User Type</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>


                            <UserListComponent />

                            
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </div>
            
            {/* // user information dialog box */}

            <div>
                
                <Dialog
                    open={open}
                    onClose={()=>{setOpen(false)}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"User Information"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { JSON.stringify(selectedUser) }
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>{
                        setOpen(false)
                        dispatch(deleteUser(selectedUser.userName))
                    }} color="primary">
                        Delete User
                    </Button>
                    <Button onClick={()=>{setOpen(false)}} color="primary" autoFocus>
                       Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default UserIndex
