import React, {useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'; 
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

import { fetchNotifications , markNotification} from '../../redux/index'


// icons
import { 
    NotificationsActive
  } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

export default function NotificationIndex() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  
  const _notificationsReducer = useSelector(state => state.notifications)
  const [notif , setNotif] = useState([])

  const [filterBy , setFilterBy] = useState("unread")

 
  
// return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    if(localStorage.getItem('Token') != null)
      dispatch(fetchNotifications(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName))
      FilterNotif(filterBy)

    prevOpen.current = open;
    
  }, [open , filterBy]);
  


  const FilterNotif = (show) =>{
    if(show == "All"){
      setNotif( _notificationsReducer.notifications )
    }else if(show == "readed"){
      const temp = _notificationsReducer.notifications.filter(function(value){ return value.notifRead == true })
     setNotif(temp)
    }else if(show == "unread"){
      var temp = _notificationsReducer.notifications.filter(function(value){ return value.notifRead == !true })
      setNotif(temp)
    }
  }


  const NotificationList = () =>{
    if(localStorage.getItem('Token') != null){
      
      if( notif.length == 0 ) return(<>You Dont Have Any Notifications !</>)
      else{
      return(<> {notif.map((notification)=>( 
        
          <MenuItem onClick={async() => {
                handleToggle()
                await dispatch(markNotification(notification.notifId))
                history.push({ pathname: `/tickets/${notification.ticketId}` })
              }
            }> <ThemeProvider theme={theme}>
              
                  <Grid >
                    <Grid item xs={12}>
                      
                        {notification.notifRead ? (<>{ notification.notifContent }</>) : ( <Typography>{ notification.notifContent }</Typography>) }
                     
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        { notification.notifDate } 
                        <Checkbox
                        disabled 
                          checked={ notification.notifRead }
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                          
                        />
                      </Typography>
                    </Grid>
                  </Grid>
              </ThemeProvider>

          </MenuItem>
      
      ))}
      
       </>)
      }
    }
  }



  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  

  return (
    <>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
            Notifications <Box ml={2} pt={1} ><NotificationsActive /></Box>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
            
                      <MenuItem>
                          <RadioGroup row aria-label="position" name="position" onChange={ (e)=> setFilterBy(e.target.value) } defaultValue="unread">
                              <FormControlLabel
                                value="unread"
                                control={<Radio color="primary" />}
                                label="Unread"
                                labelPlacement="Top"
                              />
                              <FormControlLabel
                                value="readed"
                                control={<Radio color="primary" />}
                                label="Readed"
                                labelPlacement="Top"
                              />
                              <FormControlLabel
                                value="All"
                                control={<Radio color="primary" />}
                                label="All"
                                labelPlacement="top"
                              />
                        </RadioGroup>
                      </MenuItem>
                      
                      
                      {NotificationList()}
                    </MenuList>
                  </ClickAwayListener>
                
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
  );
}
