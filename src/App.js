import React from 'react';
import {Provider} from 'react-redux'
import store from './redux/store'
import Home from './pages/Home'
import Header from './components/Header'

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
               </Switch>
            </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
