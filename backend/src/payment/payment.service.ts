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

  async checkoutBraintree(data: BraintreePaymentForm): Promise<any> {
    return this.braintree.checkout(data);
  }

  async checkoutPayPal(data: PayPalPaymentForm): Promise<any> {
    return this.paypal.checkout(data);
  }

  async checkoutStripe(data: StripePaymentForm): Promise<any> {
    return this.stripe.checkout(data);
  }
}
