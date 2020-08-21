import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logOutUser } from '../redux/index'
import { useHistory } from "react-router";


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



import { Link } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contanerStyle: {
    width: "970px"
  }
}));



export default function Header() {

  const dispatch = useDispatch();
  const history = useHistory();
  const _userReducer = useSelector(state => state.user)
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  // check token expire or not
  

  useEffect(() => {
    if(localStorage.getItem('Token') != null){
      if(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).exp < new Date().getTime()/1000){
        dispatch(logOutUser())
      }
    }
  }, [ ]);


  function LoginCheck() {
     
    if (localStorage.getItem('Token') == null) {
      return (<Button color="inherit" component={ Link } to='/UserLogin'>Login</Button>)
    } else {
      return (<Button color="inherit" onClick={ () => {
        history.push({ pathname: "/UserLogin" })
        dispatch(logOutUser())
      } } >Log Out</Button>)
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // navigation components

  function CreateTicketComponent() {
    if (localStorage.getItem("Token") == null) {
      return null
    } else { return (<Button ml={ 5 } color="inherit" component={ Link } to='/CreateTicket'>Create Ticket</Button>) }
  }


  function MyProfileComponent() {
    if (localStorage.getItem("Token") == null) { return null }
    else { return (<Button ml={ 5 } color="inherit" component={ Link } to='/MyProfile'>My Profile</Button>) }
  }

  function CompanyComponent() {
    if (localStorage.getItem("Token") == null) { return null }
    else { 
      if(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserRole == "User")  
        return null
      else return (<Button ml={ 5 } color="inherit" component={ Link } to='/Company'>Company</Button>) ;
     
    }
  }

  const permission = (nav) =>{
    if (localStorage.getItem("Token") == null)  return false;
    else
      if(nav != "Tickets") 
        if(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserRole == "User") return !true;
        else return true;
      else return true ;
  } 

  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            className={ clsx(classes.menuButton, open && classes.hide) }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={ classes.title }>
            <span onClick={ () => { history.push({ pathname: "/" }) } }>Help DESK</span>


            <CreateTicketComponent />
            <CompanyComponent />


          </Typography>

          <MyProfileComponent />
          <LoginCheck />

        </Toolbar>
      </AppBar>
      <Drawer
        className={ classes.drawer }
        variant="persistent"
        anchor="left"
        open={ open }
        classes={ {
          paper: classes.drawerPaper,
        } }
      >
        <div className={ classes.drawerHeader }>
          <IconButton onClick={ handleDrawerClose }>
            Main Manue
            { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button >
            {/* for Icon */ }
            <ListItemText primary={ "Knowledge Base" } onClick={ () => {
              history.push({ pathname: "/KnowledgeBase_index" })
              handleDrawerClose()
            } } />
          </ListItem>

          { permission("User") ? (<><ListItem button >
            {/* for Icon */ }
            <ListItemText primary={ "User" } onClick={ () => {
              history.push({ pathname: "/User" })
              handleDrawerClose()
            } } />
          </ListItem></>) : null  }

          
          { permission("Product") ? (<><ListItem button >
            {/* for Icon */ }
              <ListItemText primary={ "Product" } onClick={ () => {
              history.push({ pathname: "/Product" })
              handleDrawerClose()
            } } />
          </ListItem></>) : null  }
          { permission("Module") ? (<><ListItem button >
            {/* for Icon */ }
              <ListItemText primary={ "Module" } onClick={ () => {
              history.push({ pathname: "/Module" })
              handleDrawerClose()
            } } />
          </ListItem></>) : null  }
          { (permission("Category") ) ? (<><ListItem button >
            {/* for Icon */ }
              <ListItemText primary={ "Category" } onClick={ () => {
              history.push({ pathname: "/Category" })
              handleDrawerClose()
            } } />
          </ListItem></>) : null  }
          { (permission("Brand") ) ? (<><ListItem button >
            {/* for Icon */ }
              <ListItemText primary={ "Brand" } onClick={ () => {
              history.push({ pathname: "/Brand" })
              handleDrawerClose()
            } } />
          </ListItem></>) : null  }

          { (permission("Tickets") ) ? (<><ListItem button >
            {/* for Icon */ }
            <ListItemText primary={ "Tickets" } onClick={ () => {
              history.push({ pathname: "/Tickets" })
              handleDrawerClose()
            } } />
          </ListItem></>) : null  }

          


        </List>
        <Divider />
        <List>
          {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
      </Drawer>

    </div>
  );
}
