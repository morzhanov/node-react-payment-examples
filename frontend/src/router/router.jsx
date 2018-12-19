import React from 'react'
import { Route, Router, Switch } from 'react-router'
import Home from '../components/Home/Home'
import Profile from '../components/Profile/Profile'

const router = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </Router>
)

export default router
