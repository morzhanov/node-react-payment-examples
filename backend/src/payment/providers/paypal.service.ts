import { Injectable } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';
import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from '../../common/constants';

@Injectable()
export class PayPalService {
  constructor() {
    paypal.configure({
      mode: 'sandbox',
      client_id: PAYPAL_CLIENT_ID,
      client_secret: PAYPAL_CLIENT_SECRET
    });
  }

  public async checkout() {
    const paymentData = {
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
                price: '1.00',
                currency: 'USD',
                quantity: 1
              }
            ]
          },
          amount: {
            currency: 'USD',
            total: '1.00'
          },
          description: 'This is the payment description.'
        }
      ]
    };

    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        throw error;
      } else {
        console.log('Create Payment Response');
        console.log(payment);
      }
    });
  }
}
