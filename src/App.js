import React from 'react';
import {Provider} from 'react-redux'
import store from './redux/store'
import Header from './components/Header'

import Home from './pages/Home'
import KnowledgeBase_index from './pages/KnowledgeBase/knowledgeBase_index'
import CreateArticle from './pages/KnowledgeBase/CreateArticle'
import UserIndex from './pages/User/UserIndex';
import UserRegistration from './pages/User/UserRegistration'
import UserLogin from './pages/User/UserLogin'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'


function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App"> 
            <Router>
              <Header />
              <Switch> 
                <Route exact path="/" component={Home} />
                <Route path="/KnowledgeBase_index" component={KnowledgeBase_index} />
                <Route path="/CreateArticle" component={CreateArticle} />
                <Route path="/User" component={UserIndex} />
                <Route path="/UserRegistration" component={UserRegistration} />
                <Route path="/UserLogin" component={UserLogin} />
               </Switch>
            </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
