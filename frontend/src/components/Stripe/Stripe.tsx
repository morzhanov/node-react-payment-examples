import * as React from 'react';
import { StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './parts/CheckoutForm';

const Stripe = () => (
  <StripeProvider apiKey="pk_test_jadKOcUCozuejjL9pTB5azQu">
    <CheckoutForm />
  </StripeProvider>
);

export default Stripe;
