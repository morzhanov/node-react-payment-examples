import * as React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import logger from '../../../helpers/logger';

const handleBlur = () => {
  logger.log('[blur]');
};
const handleChange = (change: any) => {
  logger.log('[change]', change);
};
const handleFocus = () => {
  logger.log('[focus]');
};
const handleReady = () => {
  logger.log('[ready]');
};

const createOptions = (fontSize: string, padding?: string) => ({
  style: {
    base: {
      '::placeholder': {
        color: '#aab7c4'
      },
      color: '#424770',
      fontFamily: 'Source Code Pro, monospace',
      fontSize,
      letterSpacing: '0.025em',
      ...(padding ? { padding } : {})
    },
    invalid: {
      color: '#9e2146'
    }
  }
});

interface Props {
  fontSize: string;
  stripe: {
    createToken: () => Promise<any>;
  };
}

const CardForm = ({ fontSize, stripe }: Props) => {
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (stripe) {
      stripe.createToken().then((payload: any) => logger.log('[token]', payload));
    } else {
      logger.log("Stripe.js hasn't loaded yet.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(fontSize)}
        />
      </label>
      <button type="button">Pay</button>
    </form>
  );
};

export default injectStripe(CardForm);
