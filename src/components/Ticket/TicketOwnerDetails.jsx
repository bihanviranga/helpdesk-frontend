import React , {useState , useEffect ,forwardRef, useRef, useImperativeHandle}from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {   getTktOwnerByUserName } from '../../redux';
import { useHistory } from "react-router";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer'; 
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'


import Avatar from '@material-ui/core/Avatar'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'; 
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography'; 
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
  
 
const TicketOwnerDetails = forwardRef( (props , ref) => {
  useImperativeHandle(ref, () => ({

    handleClickOpen(owner) {
     
      dispatch(getTktOwnerByUserName(owner))
      setOpen(true);
     }

  }));

  const useStyles = makeStyles({
    table: {
      minWidth: 450,
    },
  });

   
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const _tktOwner = useSelector(state=>state.user.tktOwner)

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

  const [open, setOpen] = React.useState(false)

  const handleClose = () => { setOpen(false); }

  // component 
  function TickerOwnerProfileDataComponent (){
    if(_tktOwner == null){
        return ( <p> Loading ... ! </p> )
    }else{
        return ( 
        <>  
            <Container component="main" maxWidth="md">
            <CssBaseline />
                <div className={classes.paper}>
                    <Box my={5} > 
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon /> 
                      </Avatar> 
                    </Box>
                    <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            Full name : { _tktOwner.fullName }
                        </Grid>
                    
                        <Grid item xs={12} sm={6}>
                            User Type : {_tktOwner.userType }
                        </Grid>
                       
                        <Grid  item xs={12} sm={6}>
                            User Role : { _tktOwner.userRole }
                        </Grid>
                        <Grid item xs={12} sm={6}> 
                                User Name : { _tktOwner.userName }
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           
                                Phone : { _tktOwner.phone }
                          
                        </Grid>
                        <Grid item xs={12} >
                            
                                EMail : { _tktOwner.email }
                            
                        </Grid>
                        <Grid item xs={12}>
                            Company : { _tktOwner.company }
                        </Grid>
                    </Grid>
                    </form>
                </div>
                <Box mt={5}>
                     
                </Box>
            </Container>
        </> )
    }
}

  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogTitle id="alert-dialog-title">{"View Module"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">  
            {TickerOwnerProfileDataComponent()} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>

            <Button onClick={handleClose} size="small" color="primary" autoFocus> Close </Button>
             
        </DialogActions>
      </Dialog>
    </div>
  );
} )

export default TicketOwnerDetails;
