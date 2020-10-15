import React , {useEffect , useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { fetchAllUsers , deleteUser } from '../../redux'
import { useHistory } from "react-router";

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


import Avatar from '@material-ui/core/Avatar'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'; 
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import {Link} from 'react-router-dom'


//custom style
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
     
  }));

function UserIndex() {
    const dispatch = useDispatch()
    const _userReducer = useSelector(state=>state.user)
    const history =  useHistory()
    const classes = useStyles();
    
   
    const [open, setOpen] = useState(false);

    const initSelectedUser = {}
    const [selectedUser , setSelectedUser] = useState(initSelectedUser)


    useEffect(()=>{
        dispatch(fetchAllUsers())
        return () => {}
    },[])
    

    // Component

    function UserRegistrarionButtonComponet(){
        if(localStorage.getItem("Token") != null){
           return JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserRole == "Manager" ?
                ( <Button color="inherit" component={Link} to='/UserRegistration'>Register New User</Button> ) : null
            
        }else { 
            history.push({ pathname:  "/UserLogin" })           
            return null
         }

    }

     // component 
     function ProfileDataComponent (){
        if(selectedUser == null ){ 
            return ( <p> Loading ... ! </p> )
        }else{
            return ( 
            <>  
                <Container component="main" maxWidth="md">
                <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar> 
                        <Typography component="h1" variant="h5">    { selectedUser.userName } !! </Typography>
                        <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                Full name : { selectedUser.fullName }
                            </Grid>
                        
                            <Grid item xs={12} sm={6}>
                                User Type : { selectedUser.userType }
                            </Grid>
                           
                            <Grid  item xs={12} sm={6}>
                                User Role : { selectedUser.userRole }
                            </Grid>
                            <Grid item xs={12} sm={6}> 
                                    User Name : { selectedUser.userName }
                                
                            </Grid>
                            <Grid item xs={12} sm={6}>
                               
                                    Phone : { selectedUser.phone }
                              
                            </Grid>
                            <Grid item xs={12} >
                                
                                    EMail : { selectedUser.email }
                                
                            </Grid>
                            <Grid item xs={12}>
                                Company : { selectedUser.companyName }
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                   
                </Container>
            </> )
        }
    }
    

    function UserListComponent(){
        
        if(_userReducer.users.length == 0 && _userReducer.errs.fetchUserError == null ){
            
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
                        <TableCell align="right">{row.companyName}</TableCell>
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
                                <TableCell align="right"><b>Company</b></TableCell>
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
                        { ProfileDataComponent() }
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
