import * as React from 'react';
import { injectStripe, IdealBankElement } from 'react-stripe-elements';
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

const IdealBankForm = ({ fontSize, stripe }: Props) => {
  const handleSubmit = (ev: any) => {
    logger.log(ev);
    ev.preventDefault();
    if (stripe) {
      stripe
        .createSource({
          amount: 1099,
          currency: 'eur',
          owner: {
            name: ev.target.name.value
          },
          redirect: {
            return_url: 'http://localhost:3000'
          },
          type: 'ideal'
        })
        .then((payload: any) => {
          logger.log('[source]', payload);
        });
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
        iDEAL Bank
        <IdealBankElement
          className="IdealBankElement"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(fontSize, '10px 14px')}
        />
      </label>
      <button onClick={handleSubmit} type="button">
        Pay
      </button>
    </form>
  );
};

export default injectStripe(IdealBankForm);
