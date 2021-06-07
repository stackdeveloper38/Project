import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import login from './features/User/Login'
import update from './features/User/Update'
import dashboard from './features/User/Dashboard'
import notifications from './features/User/Notifications'
import election from './features/User/Election'
import profil from './features/User/Profile'
import newnotification from './features/User/NewNotification'
import { PrivateRoute } from './helpers/PrivateRoute'
import notfound from './helpers/NotFound'
function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact component={login} path='/login' />
          <Route exact component={login} path='/' />
          <PrivateRoute exact component={profil} path='/profile' />
          <PrivateRoute exact component={update} path='/update' />
          <PrivateRoute exact component={dashboard} path='/dashboard' />
          <PrivateRoute exact component={notifications} path='/notifications' />
          <PrivateRoute
            exact
            component={newnotification}
            path='/newnotification'
          />
          <PrivateRoute exact component={election} path='/elections' />
          <Route component={notfound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
