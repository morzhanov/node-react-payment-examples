import { Injectable } from '@nestjs/common';
import * as Braintree from 'braintree';

@Injectable()
export class BraintreeService {
private connection;

constructor(){
  this.connection = Braintree.connect({
    environment: brainTreeEnv,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
});
}

  public checkout(data) {
    return null;
  }
}
