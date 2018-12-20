import { Injectable } from '@nestjs/common';
import { BRAINTREE_MERCHANT_ID, BRAINTREE_PRIVATE_KEY, BRAINTREE_PUBLIC_KEY } from '../../common/constants';
import braintree = require('braintree');

@Injectable()
export class BraintreeService {
  private gateway;

  constructor() {
    this.gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: BRAINTREE_MERCHANT_ID,
      publicKey: BRAINTREE_PUBLIC_KEY,
      privateKey: BRAINTREE_PRIVATE_KEY
    });
  }

  public async checkout(data) {
    return this.gateway.transaction.sale(
      {
        amount: '5.00',
        paymentMethodNonce: 'nonce-from-the-client',
        options: {
          submitForSettlement: true
        }
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        if (result.success) {
          console.log('Transaction ID: ' + result.transaction.id);
        } else {
          console.error(result.message);
        }
      }
    );
  }
}
