import React , {useEffect , useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { useHistory } from "react-router";
import { getUserByUserName } from '../../redux'


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

function MyProfile() {
    const dispatch = useDispatch()
    const history = useHistory();
    const classes = useStyles();
    
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

    // component 
    function ProfileDataComponent (){
        if(_userReducer.user == null && localStorage.getItem("Token") != null){
            dispatch(getUserByUserName(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName))
            // 
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
                        <Typography component="h1" variant="h5"> Hii { _userReducer.user.userName } !! </Typography>
                        <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                Full name : { _userReducer.user.fullName }
                            </Grid>
                        
                            <Grid item xs={12} sm={6}>
                                User Type : { _userReducer.user.userType }
                            </Grid>
                           
                            <Grid  item xs={12} sm={6}>
                                User Role : { _userReducer.user.userRole }
                            </Grid>
                            <Grid item xs={12} sm={6}> 
                                    User Name : { _userReducer.user.userName }
                                
                            </Grid>
                            <Grid item xs={12} sm={6}>
                               
                                    Phone : { _userReducer.user.phone }
                              
                            </Grid>
                            <Grid item xs={12} >
                                
                                    EMail : { _userReducer.user.email }
                                
                            </Grid>
                            <Grid item xs={12}>
                                Company : { _userReducer.user.company }
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </> )
        }
    }

    return (
        <div> 
            { ProfileDataComponent() }
        </div>
    )
}

export default MyProfile
