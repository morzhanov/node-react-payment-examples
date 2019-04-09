import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class BasePaymentForm {
  @IsNotEmpty()
  @ApiModelProperty({ required: true, description: 'Email string' })
  email: string;

  @IsNotEmpty()
  @ApiModelProperty({ required: true, description: 'Amount of money' })
  amount: number;
}

export class BraintreePaymentForm extends BasePaymentForm {
  @IsNotEmpty()
  @ApiModelProperty({ required: true, description: 'Braintree nonce' })
  nonce: string;
}

export class PayPalPaymentForm extends BasePaymentForm {}

export class StripePaymentForm extends BasePaymentForm {
  source: any;
}
