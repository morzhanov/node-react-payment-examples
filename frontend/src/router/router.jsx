import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Home from '../components/Home/Home'

const router = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
)

export default router
