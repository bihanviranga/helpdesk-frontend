import React from 'react';


import { Provider } from 'react-redux'
import store from './redux/store'
import Header from './components/Header'

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
import Product from './pages/product/ProductIndex'
import Module from './pages/Module/ModuleIndex'
import Category from './pages/Category/CategoryIndex'
import ListTickets from './pages/Ticket/ListTickets';
import DetailTicket from './pages/Ticket/DetailTicket';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'



function App() {
  
  const isLogin = () => {
    var Token = (localStorage.getItem("Token") != null ) ? true : false
    if (Token )  return true
    else return false
  }

  return (
    <>
      <Provider store={ store }>
        <div className="App">
          <Router>
            <Header />

            <Container maxWidth={ "xl" }>
              <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/KnowledgeBase_index" component={ KnowledgeBase_index } />
                <Route path="/CreateArticle"  component={ () => isLogin() ? <CreateArticle /> :<UserLogin /> } />
                <Route path="/User" component={ () => isLogin() ? <UserIndex /> :<UserLogin /> } />
                <Route path="/UserRegistration" component={ () => isLogin() ? <UserRegistration /> :<UserLogin /> } />
                <Route path="/UserLogin" component={ () => isLogin() ? <UserLogin /> :<UserLogin /> } />
                <Route path="/CreateTicket" component={ () => isLogin() ? <CreateTicket /> :<UserLogin /> } />
                <Route path="/MyProfile" component={ () => isLogin() ? <MyProfile /> :<UserLogin /> } />
                <Route path="/Company" component={ () => isLogin() ? <Company /> :<UserLogin /> } />
                <Route path="/Product" component={ () => isLogin() ? <Product /> :<UserLogin /> } />
                <Route path="/Module" component={ () => isLogin() ? <Module /> :<UserLogin /> } />
                <Route path="/Category" component={ () => isLogin() ? <Category /> :<UserLogin /> } />
                <Route path="/TestComponent" component={ () => isLogin() ? <TestComponent /> :<UserLogin /> } />
                <Route path="/Tickets" component={ () => isLogin() ? <ListTickets /> :<UserLogin /> } /> 
                <Route path="/Tickets/:ticketId" component={ () => isLogin() ? <DetailTicket /> :<UserLogin /> } /> 
              </Switch>
            </Container>
          </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
