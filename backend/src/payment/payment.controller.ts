import { Controller, Body, Post, Get, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { BraintreePaymentForm, StripePaymentForm, PayPalPaymentForm } from './payment.forms';

@ApiUseTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('braintree/token')
  async getBraintreeNonceToken(): Promise<any> {
    return this.paymentService.getBraintreeNonceToken();
  }

  @Post('braintree')
  async checkoutBraintree(@Res() res, @Body() data: BraintreePaymentForm): Promise<any> {
    const result = await this.paymentService.checkoutBraintree(data);
    if (result.success) {
      res.status(200).send('Successfully paid');
    } else {
      res.status(400).send(result.message);
    }
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
