import * as React from 'react';
import { injectStripe, IbanElement } from 'react-stripe-elements';
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
    createSource: (props: any) => Promise<any>;
  };
}

const IbanForm = ({ fontSize, stripe }: Props) => {
  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    if (stripe) {
      stripe
        .createSource({
          currency: 'eur',
          mandate: {
            notification_method: 'email'
          },
          owner: {
            email: ev.target.email.value,
            name: ev.target.name.value
          },
          type: 'sepa_debit'
        })
        .then((payload: any) => logger.log('[source]', payload));
    } else {
      logger.log("Stripe.js hasn't loaded yet.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" placeholder="Jane Doe" required />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="jane.doe@example.com" required />
      </label>
      <label>
        IBAN
        <IbanElement
          supportedCountries={['SEPA']}
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

export default injectStripe(IbanForm);
