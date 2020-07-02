import React , {useEffect} from 'react';
import {useSelector , useDispatch} from 'react-redux'
import { getProfile , logOutUser} from '../redux/index'


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



export default function Header() {

  const dispatch = useDispatch();
  const _userReducer = useSelector(state=>state.user)

  useEffect(()=>{
    if(_userReducer.userProfile == null && localStorage.getItem('Token') != null){
      
      dispatch(getProfile())
    }
    return()=>{

    }
  },[_userReducer.userProfile , localStorage.getItem('Token') ])
  
  function LoginCheck(){
    if(localStorage.getItem('Token') == null){
      return ( <Button color="inherit" component={Link} to='/UserLogin'>Login</Button> )
    }else{
      return ( <Button color="inherit" onClick={()=>{
        dispatch(logOutUser())
      }} >Log Out</Button> )
    }
  }

  function CreateTicket(){
    if(_userReducer.userProfile == null){
      return null
    }else{ return (<Button ml={5} color="inherit" component={Link} to='/CreateTicket'>Create Ticket</Button>) }
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Help DESK
            <Button ml={5} color="inherit" component={Link} to='/'>Home</Button>
            <Button ml={5} color="inherit" component={Link} to='/KnowledgeBase_index'>Knowledge Base</Button>
            <Button ml={5} color="inherit" component={Link} to='/User'>User</Button>
            
            <CreateTicket />

          </Typography>

          <LoginCheck />

        </Toolbar>
      </AppBar>
    </div>
  );
}
