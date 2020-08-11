import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createUser , fetchAllCompanies ,} from '../../redux'
import { useHistory } from "react-router";
import Axios from "axios"
import API_PATH from '../../redux/api'

import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


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



function UserRegistration() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const _companyReducer = useSelector(state=>state.company) 
 

    const initUser = {
        CompanyId : '',
        FullName : null,
        Email : '',
        UserName : '',
        Phone : null,
        UserImage : null,
        UserRole : '',
        UserType : '',
        Password : null,
        ConfirmPassword : null
    }
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const [user , setUser] = useState(initUser);

    const registerUser = (e) =>{
        e.preventDefault();
        if(_err.ErrMsg == "NotTakenYet" && _err.ErrMsg != null){
            if(user.UserRole.length > 0 && user.UserType.length > 0 && user.CompanyId.length > 0 ){
                console.log(user.Password, user.ConfirmPassword )
                if(user.Password == user.ConfirmPassword ){
                    dispatch(createUser(user))  
                    history.push({
                        pathname:  "/User"
                        })
                }else{
                    _setErr({ ..._err , ErrMsg : "Passwords not Match" })
                }
            }else{
                _setErr({ ..._err , ErrMsg : "Fill All" })
            }
        }else{
             alert(_err.ErrMsg)
        }
    }

    const [_err , _setErr] = useState({ ErrMsg: null });

    const _checkAvaibality = () => {
        if( user.Email.length !== 0 && user.UserName.length !== 0){ 
            Axios.post(`${API_PATH}/user/CheckAvaibality` , { UserName: user.UserName, Email: user.Email } , {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
            })
            .then(res => {
                if(res.data == "NotTakenYet"){ 
                    setOpen(true)
                    _setErr({ ..._err , ErrMsg : res.data })
                }
                else if(res.data  == "Email_AlreadyTaken"){ 
                    _setErr({ ..._err , ErrMsg : 'Email Already Taken' })    
                }
                else if(res.data == "UserName_AlreadyTaken"){
                    _setErr({ ..._err , ErrMsg : 'UserName Already Taken' })
                }
                else if(res.data == "Both_AlreadyTaken" ){ 
                    _setErr({ ..._err , ErrMsg : 'UserName and Email AlreadyTaken' })
                 }
               
            })
        }
    }

    const errAtert = () =>{
        if( _err.ErrMsg != 'NotTakenYet' && _err.ErrMsg != null ){

            return(
                <>
                    <Collapse in={open}>
                        <Alert severity="error" action={
                            <IconButton aria-label="close"  color="inherit" size="small"
                            onClick={() => { setOpen(false); }} >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        > {JSON.stringify(_err.ErrMsg)} </Alert>
                    </Collapse> 
                </>
            )
        }else{
            
            return( <></> )
        }
    }

    useEffect(()=>{
        dispatch(fetchAllCompanies())
        return()=>{ }   
    },[ ])

      function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              99x Help Desk
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
    return (
        <div>
            <>
            

           <div className={classes.root}>
                { errAtert() }
            </div>


            <Container component="main" maxWidth="md">
                <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5"> Register New User </Typography>
                        <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    name="FullName" variant="outlined" required fullWidth  label="Full Name" autoFocus
                                    onChange={e=>  setUser({ ...user , FullName : e.target.value })}
                                />
                            </Grid>
                        
                            <Grid item xs={12} sm={6}>
                                <TextField   variant="outlined" required fullWidth label="Email"  name="Email"
                                onBlur={ () =>{ _checkAvaibality() } }  
                                onChange={e=> { setUser({ ...user , Email : e.target.value }) }}   
                                />
                            </Grid>
                           
                            <Grid  item xs={12} sm={6}>
                                <TextField  variant="outlined" value={ user.UserName } required fullWidth label="UserName"  name="UserName"
                                onBlur={ () =>{ _checkAvaibality() } }  
                                onChange = { e=> { setUser({ ...user , UserName : e.target.value }) } }
                                  
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel  >UserRole</InputLabel>
                                    <Select native name="UserRole" label="UserRole" onChange={e=>  setUser({ ...user , UserRole : e.target.value })} >
                                        <option value="" >  </option>
                                        <option  value="Manager">Manager</option>
                                        <option value="User">User</option> 
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel  >UserType</InputLabel>
                                    <Select native name="UserType" label="UserType" onChange={e=>  setUser({ ...user , UserType : e.target.value })} >
                                        <option value=""></option>
                                        <option value="Client">Client</option>
                                        <option value="HelpDesk">Help Desk</option> 
                                    </Select>
                                </FormControl>
                            </Grid>
                                <Grid item xs={12} >
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel  >CompanyName</InputLabel>
                                        <Select  native  label="CompanyName" name="CompanyName" onChange={e=>  setUser({ ...user , CompanyId : e.target.value })} >
                                            <option value=""></option>
                                            {_companyReducer.companies.map((company)=>(
                                                <option key={company.companyId} value={company.companyId}>{ company.companyName }</option>
                                            ))} 
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="UserImage" 
                                    type="file" onChange={e=>  setUser({ ...user , UserImage : e.target.value })}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="Phone" label="Phone Number"
                                    onChange={e=>  setUser({ ...user , Phone : e.target.value })}   
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="Password" label="Password"
                                    type="password" onChange={e=>  setUser({ ...user , Password : e.target.value })}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="ConfirmPassword" label="Confirm Password"
                                    type="password" onChange={e=>  setUser({ ...user , ConfirmPassword : e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit" fullWidth  variant="contained" color="primary"
                            className={classes.submit} onClick={(e)=>{  registerUser(e) }} > Register </Button>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
                );
            </>
        </div>           
    )
}

export default UserRegistration
