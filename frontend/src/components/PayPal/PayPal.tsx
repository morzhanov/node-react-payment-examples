import * as React from 'react';
// @ts-ignore
import PaypalExpressBtn from 'react-paypal-express-checkout';
import styled from '@emotion/styled';
import logger from '../../helpers/logger';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PayPal() {
  const onSuccess = (payment: any) => {
    // 1, 2, and ... Poof! You made it, everything's fine and dandy!
    logger.log('Payment successful!', payment);
    // You can bind the "payment" object's value to your state or
    // props or whatever here, please see below for sample returned data
  };

  const onCancel = (data: any) => {
    // The user pressed "cancel" or closed the PayPal popup
    logger.log('Payment cancelled!', data);
    // You can bind the "data" object's value to your state
    // or props or whatever here, please see below for sample returned data
  };

  const onError = (err: Error) => {
    // The main Paypal script could not be loaded or something blocked the script from loading
    logger.log('Error!', err);
    // Because the Paypal's main script is loaded asynchronously
    // from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set,
    // or for the button to appear
  };

  const env = 'sandbox'; // you can set this string to 'production'
  const currency = 'USD'; // you can set this string from your props or state
  const total = 1; // this is the total amount (based on currency) to charge
  // Document on Paypal's currency code:
  // https://developer.paypal.com/docs/classic/api/currency_codes/

  const client = {
    production: 'YOUR-PRODUCTION-APP-ID',
    sandbox: 'YOUR-SANDBOX-APP-ID'
  };
  // In order to get production's app-ID,
  // you will have to send your app to Paypal for approval first
  // For your sandbox Client-ID (after logging into your developer account, please locate
  // the "REST API apps" section, click "Create App" unless you have already done so):
  //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
  // Note: IGNORE the Sandbox test AppID - this is ONLY for Adaptive APIs, NOT REST APIs)
  // For production app-ID:
  //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

  // NB. You can also have many Paypal express checkout buttons on page,
  // just pass in the correct amount and they will work!
  return (
    <Wrapper>
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Wrapper>
  );
}
