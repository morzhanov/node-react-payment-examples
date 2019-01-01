import { Injectable } from '@nestjs/common';
import { BraintreeService } from './providers/braintree.service';
import { StripeService } from './providers/stripe.service';
import { PayPalService } from './providers/paypal.service';
import { BraintreePaymentForm, StripePaymentForm, PayPalPaymentForm } from './payment.forms';
import logger from '../common/logger.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly braintree: BraintreeService,
    private readonly stripe: StripeService,
    private readonly paypal: PayPalService
  ) {}

  async getBraintreeNonceToken(): Promise<string> {
    return this.braintree.getToken();
  }

  async checkoutBraintree({ email, amount, nonce }: BraintreePaymentForm): Promise<any> {
    return this.braintree.checkout({ email, amount, nonce });
  }

  async checkoutPayPal({ email, amount }: StripePaymentForm): Promise<any> {
    return; // TODO: implement
  }

  async checkoutStripe({ email, amount }: PayPalPaymentForm): Promise<any> {
    return; // TODO: implement
  }
}
