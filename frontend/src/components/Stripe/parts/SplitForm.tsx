import * as React from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements';
import logger from '../../../helpers/logger';

const handleBlur = () => {
  logger.log('[blur]');
};
const handleFocus = () => {
  logger.log('[focus]');
};
const handleReady = () => {
  logger.log('[ready]');
};
const handleChange = (change: any) => {
  logger.log('[change]', change);
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

const SplitForm = ({ fontSize, stripe }: Props) => {
  const handleSubmit = (ev: any) => {
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
        Card number
        <CardNumberElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(fontSize)}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(fontSize)}
        />
      </label>
      <label>
        CVC
        <CardCVCElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(fontSize)}
        />
      </label>
      <label>
        Postal code
        <PostalCodeElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(fontSize)}
        />
      </label>
      <button onClick={handleSubmit} type="button">
        Pay
      </button>
    </form>
  );
};

export default injectStripe(SplitForm);
