import { Injectable } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';
import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from '../../common/constants';
import logger from '../../common/logger.service';

@Injectable()
export class PayPalService {
  constructor() {
    paypal.configure({
      mode: 'sandbox',
      client_id: PAYPAL_CLIENT_ID,
      client_secret: PAYPAL_CLIENT_SECRET
    });
  }

  public async checkout({ amount }): Promise<any> {
    const paymentData: paypal.Payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://return.url',
        cancel_url: 'http://cancel.url'
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'item',
                sku: 'item',
                price: amount,
                currency: 'USD',
                quantity: 1
              }
            ]
          },
          amount: {
            currency: 'USD',
            total: amount
          },
          description: 'This is the payment description.'
        }
      ]
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
          logger.error(`Paypal payment error: ${error}`);
          reject(error);
        } else {
          logger.info(`Paypal payment successed: ${payment.id}`);
          resolve(payment);
        }
      });
    });
  }
}
