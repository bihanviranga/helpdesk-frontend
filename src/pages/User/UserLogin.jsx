import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { loginUser } from '../../redux'


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


  //component
  function CopyrightComponent() {
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

function UserLogin() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const intLoginDetails = {
        UserNameOrEmail:null,
        password:null
    }

    const [LoginDetails , setLoginDetails] = useState(intLoginDetails);


    return (
        <div>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5"> Login </Typography>
                        <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth name="UserNameOrEmail" label="UserName Or Email"
                                onChange={e=>  setLoginDetails({ ...LoginDetails , UserNameOrEmail : e.target.value })}   
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth name="Password" label="Password"
                                type="password" onChange={e=>  setLoginDetails({ ...LoginDetails , password : e.target.value })}
                            />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit" fullWidth  variant="contained" color="primary"
                            className={classes.submit} onClick={(e)=>{
                                dispatch(loginUser(LoginDetails))
                                e.preventDefault();
                            }} > Login </Button>
                        </form>
                    </div>
                    <Box mt={5}>
                        <CopyrightComponent />
                    </Box>
                </Container>
        </div>
    )
}

export default UserLogin
