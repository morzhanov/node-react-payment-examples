import * as React from 'react';
import { StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './parts/CheckoutForm';

const Stripe = () => (
  <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
    <CheckoutForm />
  </StripeProvider>
);

export default Stripe;
