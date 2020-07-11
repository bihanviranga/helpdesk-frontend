import React , {useEffect} from 'react';
import {useSelector , useDispatch} from 'react-redux'


import {Provider} from 'react-redux'
import store from './redux/store'
import Header from './components/Header'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Home from './pages/Home'
import KnowledgeBase_index from './pages/KnowledgeBase/knowledgeBase_index'
import CreateArticle from './pages/KnowledgeBase/CreateArticle'
import UserIndex from './pages/User/UserIndex';
import UserRegistration from './pages/User/UserRegistration'
import UserLogin from './pages/User/UserLogin'
import MyProfile from './pages/User/MyProfile'
import CreateTicket from './pages/Ticket/CreateTicket'
import Company from './pages/Company/CompanyIndex'
import TestComponent from './components/TestComponent'
import Container from '@material-ui/core/Container';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

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
}));


function App() {
  const classes = useStyles();
  return (
    <>
      <Provider store={store}>
        <div className="App"> 
            <Router>
              <Header />
            
                  <Container  maxWidth={"xl"}>
                    <Switch> 
                        <Route exact path="/" component={Home} />
                        <Route path="/KnowledgeBase_index" component={KnowledgeBase_index} />
                        <Route path="/CreateArticle" component={CreateArticle} />
                        <Route path="/User" component={UserIndex} />
                        <Route path="/UserRegistration" component={UserRegistration} />
                        <Route path="/UserLogin" component={UserLogin} />
                        <Route path="/CreateTicket" component={CreateTicket} />
                        <Route path="/MyProfile" component={MyProfile} />
                        <Route path="/Company" component={Company} />
                        <Route path="/TestComponent" component={TestComponent} />
                    </Switch>
                  </Container>
            </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
