import { Injectable } from '@nestjs/common';
import * as Braintree from 'braintree';
import { BRAINTREE_MERCHANT_ID, BRAINTREE_PRIVATE_KEY, BRAINTREE_PUBLIC_KEY } from '../../common/constants';

@Injectable()
export class BraintreeService {
  private connection;

  constructor() {
    this.connection = Braintree.connect({
      environment: 'dev',
      merchantId: BRAINTREE_MERCHANT_ID,
      publicKey: BRAINTREE_PUBLIC_KEY,
      privateKey: BRAINTREE_PRIVATE_KEY
    });
  }

  public checkout(data) {
    return this.connection;
  }
}
