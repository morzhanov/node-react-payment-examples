import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Home from '../components/Home/Home'
import Braintree from '../components/Braintree/Braintree'
import PayPal from '../components/PayPal/PayPal'
import Stripe from '../components/Stripe/Stripe'
import Header from '../components/shared/Header'

const router = ({ history }) => (
  <Router history={history}>
    <>
      <Header>Header</Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/braintree" component={Braintree} />
        <Route path="/paypal" component={PayPal} />
        <Route path="/stripe" component={Stripe} />
      </Switch>
    </>
  </Router>
)

export default router
