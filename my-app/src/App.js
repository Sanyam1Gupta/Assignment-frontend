import React from 'react';
import logo from './logo.svg';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import AllContests from './AllContests.js'
import Contest from './Contest.js'

function App() {
  return (
    <div>
      <Router>
              <Switch>
              <Route path="/" exact component={AllContests}/>
            <Route path="/contest/:id" component={Contest}/>
            </Switch>
            
            </Router>
    </div>
    
  );
}

export default App;
