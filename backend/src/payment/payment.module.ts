import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { BraintreeService } from './providers/braintree.service';
import { StripeService } from './providers/stripe.service';
import { PayPalService } from './providers/paypal.service';

@Module({
  providers: [PaymentService, BraintreeService, StripeService, PayPalService],
  controllers: [PaymentController]
})
export class PaymentModule {}
