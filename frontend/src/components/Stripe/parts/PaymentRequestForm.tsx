import * as React from 'react';
import { injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements';
import logger from '../../../helpers/logger';

const { useEffect, useState } = React;

const handleBlur = () => {
  logger.log('[blur]');
};
const handleFocus = () => {
  logger.log('[focus]');
};
const handleReady = () => {
  logger.log('[ready]');
};

interface Props {
  stripe: {
    paymentRequest: (props: any) => any;
  };
}

const PaymentRequestForm = ({ stripe }: Props) => {
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    const pR = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        amount: 1000,
        label: 'Demo total'
      }
    });
    setPaymentRequest(pR);
    pR.on('token', ({ complete, token, ...data }: any) => {
      logger.log('Received Stripe token: ', token);
      logger.log('Received customer information: ', data);
      complete('success');
    });

    pR.canMakePayment().then((result: any) => {
      setCanMakePayment(!!result);
    });
  }, []);

  return canMakePayment && paymentRequest ? (
    <PaymentRequestButtonElement
      className="PaymentRequestButton"
      onBlur={handleBlur}
      onFocus={handleFocus}
      onReady={handleReady}
      paymentRequest={paymentRequest}
      style={{
        paymentRequestButton: {
          height: '64px',
          theme: 'dark',
          type: 'donate'
        }
      }}
    />
  ) : null;
};

export default injectStripe(PaymentRequestForm);
