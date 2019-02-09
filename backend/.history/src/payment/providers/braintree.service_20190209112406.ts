import { Injectable } from '@nestjs/common';
import { BRAINTREE_MERCHANT_ID, BRAINTREE_PRIVATE_KEY, BRAINTREE_PUBLIC_KEY } from '../../common/constants';
import braintree = require('braintree');
import logger from '../../common/logger.service';
import { BraintreePaymentForm } from '../payment.forms';

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

  async getToken(): Promise<string> {
    return await new Promise(resolve => {
      this.gateway.clientToken.generate({}, (_, response) => {
        logger.info(`Issued new Braintree nonce token: ${response.clientToken}`);
        resolve(response);
      });
    });
  }

  public async checkout({ amount, nonce }: BraintreePaymentForm): Promise<any> {
    return new Promise(resolve => {
      this.gateway.transaction.sale(
        {
          amount,
          // paymentMethodNonce: nonce,
          paymentMethodNonce: 'nonce-from-the-client',
          options: {
            submitForSettlement: true
          }
        },
        (err, result) => {
          if (err) {
            logger.error(err);
            return;
          }

          if (result.success) {
            logger.info('Braintree paid, Transaction ID: ' + result.transaction.id);
            resolve(result);
          } else {
            logger.error(result.message);
            resolve(result);
          }
        }
      );
    });
  }
}
