import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';


import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'; 

import { fetchNotifications , markNotification} from '../../redux/index'

// icons
import { 
    NotificationsActive
  } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function NotificationIndex() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  
  const _notificationsReducer = useSelector(state => state.notifications)


  const NotificationList = () =>{
    if(localStorage.getItem('Token') != null){
      dispatch(fetchNotifications(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName))

      if( _notificationsReducer.notifications.length == 0 ) return(<>You Dont Have Any Notifications !</>)
      else{
      return(<> {_notificationsReducer.notifications.map((notification)=>( 
        <> 
          <MenuItem onClick={async() => {
                handleToggle()
                await dispatch(markNotification(notification.notifId))
                history.push({ pathname: `/tickets/${notification.ticketId}` })
              }
            }>
            {notification.notifRead ? (<>{ notification.notifContent }</>) : ( <><b> { notification.notifContent } </b></> ) }
          </MenuItem>
        </>
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
