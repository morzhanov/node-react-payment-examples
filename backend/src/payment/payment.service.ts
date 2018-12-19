import { Injectable } from '@nestjs/common';
import { BraintreePaymentForm, StripePaymentForm, PayPalPaymentForm } from './payment.forms';

@Injectable()
export class PaymentService {
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
