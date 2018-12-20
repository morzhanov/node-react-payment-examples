import { Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';
import { STRIPE_API_KEY } from '../../common/constants';

@Injectable()
export class PayPalService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_API_KEY);
  }

  public async checkout() {
    this.stripe.customers
      .create({
        email: 'foo-customer@example.com'
      })
      .then(customer => {
        return this.stripe.customers.createSource(customer.id, {
          source: 'tok_visa'
        });
      })
      .then(source => {
        return this.stripe.charges.create({
          amount: 1600,
          currency: 'usd',
          customer: source.customer
        });
      })
      .then(charge => {
        // New charge created on a new customer
      })
      .catch(err => {
        // Deal with an error
      });
  }
}
