import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createUser , fetchAllCompanies } from '../../redux'
import { useHistory } from "react-router";


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
  }));



function UserRegistration() {
    const dispatch = useDispatch();
    const classes = useStyles();

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
          
            dispatch(fetchAllCompanies())
         
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

    return (
        <div>
            <>
            <Container component="main" maxWidth="sm">
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
                            <Grid item xs={12}>
                            <TextField  variant="outlined" required fullWidth label="Email"  name="Email"
                            onChange={e=>  setUser({ ...user , Email : e.target.value })}   
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
                                        <option value="Clien">Clien</option>
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
                                    type="password" onChange={e=>  setUser({ ...user , UserImage : e.target.value })}
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
