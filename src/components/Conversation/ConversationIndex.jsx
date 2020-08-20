import React , {useState , useEffect ,forwardRef, useImperativeHandle}from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { createConversation , fetchConvesations } from '../../redux';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';

const ConversationIndex = forwardRef( (props , ref) => {
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({

    handleClickOpen(ticketId) { 
      setConversation({ ...conversation , TicketId : ticketId })
      setOpen(true);
    }

  }));

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
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
       
    },
  }));

  const _conversationReducer = useSelector(state=>state.conversation)

  const handleClose = () => { setOpen(false); }
  const classes = useStyles();
  const dispatch = useDispatch();
 
  


  const [conversation , setConversation] = useState({
    TicketId : null,
    CvSender : JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName,
    CvSenderType : JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserType,
    CvSendDate : null,
    CvContent : ''
  });
  
  useEffect(() => {
    if(conversation.TicketId !== null){ 
      dispatch(fetchConvesations(conversation.TicketId))
    }
  }, [conversation.TicketId ]);

  const cretaeConversation =  () => {
     
    // setConversation({ ...conversation , CvSendDate : new Date()  })
    
    dispatch(createConversation(conversation))
  }

  const fetchConversationComponent = () => {
     
      return(
        _conversationReducer.conversations.map((element , index )=> (
          <Grid item xs={12} >
              <Box  borderColor="primary.main" p={1} border={1}  borderRadius="borderRadius"  >
               
              <Grid container spacing={3}>
                 <Grid item xs={12} sm={6}>
                  <b>Publisher :</ b>  {element.cvSender}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <b> On :</ b>  {element.cvSendDate}
                </Grid>
                 
              </Grid>
               <hr />  
              <Grid item xs={12} >
                 { element.cvContent }
              </Grid>
                
              </ Box>  
          </ Grid >
        ))
      )
    
      
    
  }


  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogTitle id="alert-dialog-title">{"Conversation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
              <Grid container spacing={2}   > 
                 { fetchConversationComponent() }
              </Grid>
               
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Grid container spacing={2}> 
                  <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth name="Content" label="Message"
                        onChange={e=>  setConversation({ ...conversation , CvContent : e.target.value  })}
                    />
                  </Grid>
                  
              </Grid>
              <Box my={3}>
                <Button
                  type="submit" fullWidth  variant="contained" color="primary"
                  className={classes.submit} onClick={  (e)=>{
                      cretaeConversation()
                      e.preventDefault();
                  }} > Send </Button>
              </Box> 
        </DialogActions>
      </Dialog>
    </div>
  );
} )

export default ConversationIndex;
