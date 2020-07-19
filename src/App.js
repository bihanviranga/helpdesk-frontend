import React, { useEffect } from 'react';

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

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'



function App() {

  const isLogin = () => {
    if (localStorage.getItem("Token") == null) {
      return false
    } else {
      return true
    }
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
                <Route path="/CreateArticle" >{ isLogin() ? <CreateArticle /> : <UserLogin /> }</Route >
                <Route path="/User" >{ isLogin() ? <UserIndex /> : <UserLogin /> }</Route >
                <Route path="/UserRegistration" >{ isLogin() ? <UserRegistration /> : <UserLogin /> }</Route >
                <Route path="/UserLogin" >{ <UserLogin /> }</Route >
                <Route path="/CreateTicket" >{ isLogin() ? <CreateTicket /> : <UserLogin /> }</Route >
                <Route path="/MyProfile" >{ isLogin() ? <MyProfile /> : <UserLogin /> }</Route >
                <Route path="/Company" >{ isLogin() ? <Company /> : <UserLogin /> }</Route >
                <Route path="/Product" >{ isLogin() ? <Product /> : <UserLogin /> }</Route >
                <Route path="/Module" >{ isLogin() ? <Module /> : <UserLogin /> }</Route >
                <Route path="/Category" >{ isLogin() ? <Category /> : <UserLogin /> }</Route >
                <Route path="/TestComponent" >{ isLogin() ? <TestComponent /> : <UserLogin /> }</Route >
                <Route path="/Tickets" > <ListTickets /> </Route>
              </Switch>
            </Container>
          </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
