import { Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';
import { STRIPE_API_KEY } from '../../common/constants';
import logger from '../../common/logger.service';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_API_KEY);
  }

  public async checkout({ email, amount }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.stripe.customers
        .create({
          email
        })
        .then(customer => {
          // creating customer for simplicity
          return this.stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
          });
        })
        .then(source => {
          return this.stripe.charges.create({
            amount,
            currency: 'usd',
            customer: source.customer
          });
        })
        .then(charge => {
          logger.info(`Stripe payment successfull: ${charge.id}`);
          resolve(charge);
        })
        .catch(err => {
          logger.error(`Stripe payment error: ${err}`);
          reject(err);
        });
    });
  }
}
