import { Injectable } from '@nestjs/common';
import { BraintreeService } from './providers/braintree.service';
import { StripeService } from './providers/stripe.service';
import { PayPalService } from './providers/paypal.service';
import { BraintreePaymentForm, StripePaymentForm, PayPalPaymentForm } from './payment.forms';

@Injectable()
export class PaymentService {
  constructor(
    private readonly braintree: BraintreeService,
    private readonly stripe: StripeService,
    private readonly paypal: PayPalService
  ) {}

  async checkoutBraintree({ email, amount, nonce }: BraintreePaymentForm): Promise<any> {
    return; // TODO: implement
  }

  async checkoutPayPal({ email, amount }: StripePaymentForm): Promise<any> {
    return; // TODO: implement
  }

  async checkoutStripe({ email, amount }: PayPalPaymentForm): Promise<any> {
    return; // TODO: implement
  }
}
