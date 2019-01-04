import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
// import StoreCheckout from './parts/StoreCheckout'
import PaymentForm from './parts/PaymentRequestForm'

const Stripe = () => (
  <StripeProvider apiKey="pk_test_12345">
    {/* <StoreCheckout /> */}
    <Elements>
      <PaymentForm />
    </Elements>
  </StripeProvider>
)

export default Stripe
