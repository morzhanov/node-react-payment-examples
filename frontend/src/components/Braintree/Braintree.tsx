import * as React from 'react';
import axios from 'axios';
// @ts-ignore
import DropIn from 'braintree-web-drop-in-react';
import logger from '../../helpers/logger';

const { useState, useRef, useEffect } = React;

const buy = async (instance: any) => {
  // Send the nonce to your server
  const { nonce } = await instance.requestPaymentMethod();
  const { data } = await axios.post('http://localhost:4000/payment/braintree', {
    amount: 100,
    email: 'vlad.morzhanov@gmail.com',
    nonce
  });
  logger.log('Braintree payment accepted: ', data);
};

const Braintree = () => {
  const [clientToken, setClientToken] = useState(null);
  const instance = useRef();

  useEffect(() => {
    const fetchClientToken = async () => {
      // Get a client token for authorization from your server
      const { data } = await axios.get('http://localhost:4000/payment/braintree/token/');
      logger.log('Braintree token received: ', clientToken);

      setClientToken(data.clientToken);
    };
    fetchClientToken();
  }, []);

  if (!clientToken) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <DropIn
        options={{ authorization: clientToken }}
        onInstance={(inst: any) => {
          instance.current = inst;
        }}
      />
      <button type="button" onClick={buy}>
        Buy
      </button>
    </div>
  );
};

export default Braintree;
