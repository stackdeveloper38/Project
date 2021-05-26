import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './features/User/Login';
import Update from './features/User/Update';
import Dashboard from './features/User/Dashboard';
import Notifications from './features/User/Notifications';
import Candidates from './features/User/Candidates';
import NewCandidate from './features/User/NewCandidate';
import NewNotification from './features/User/NewNotification';
import { PrivateRoute } from './helpers/PrivateRoute';
import NotFound from './helpers/NotFound';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>     
          <Route exact component={Login} path="/login" />      
          <PrivateRoute exact component={Update} path="/" /> 
          <PrivateRoute exact component={Dashboard} path="/Dashboard" /> 
          <PrivateRoute exact component={Notifications} path="/Notifications" /> 
          <PrivateRoute exact component={NewNotification} path="/NewNotification" /> 
          <PrivateRoute exact component={Candidates} path="/Candidates" />     
          <PrivateRoute exact component={NewCandidate} path="/NewCandidate" /> 
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
