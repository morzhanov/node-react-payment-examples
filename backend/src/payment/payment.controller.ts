import { Controller, Body, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { BraintreePaymentForm, StripePaymentForm, PayPalPaymentForm } from './payment.forms';

@ApiUseTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('braintree')
  async checkoutBraintree(@Body() data: BraintreePaymentForm): Promise<any> {
    return this.paymentService.checkoutBraintree(data);
  }

  @Post('stripe')
  async checkoutStripe(@Body() data: StripePaymentForm): Promise<any> {
    return this.paymentService.checkoutStripe(data);
  }

  @Post('paypal')
  async checkoutPayPal(@Body() data: PayPalPaymentForm): Promise<any> {
    return this.paymentService.checkoutPayPal(data);
  }
}
