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

  public async checkout({ email, source, amount }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.stripe.customers
        .create({
          email,
          source: source.id
        })
        .then(customer =>
          this.stripe.charges.create({
            amount,
            description: 'Sample Charge',
            currency: 'usd',
            customer: customer.id
          })
        )
        .then(charge => resolve(`successfully charged ${charge}`))
        .catch(err => {
          logger.error(`Stripe payment error: ${err}`);
          reject(err);
        });
    });
  }
}
