import * as React from 'react';
import { Elements } from 'react-stripe-elements';
import SplitForm from './SplitForm';

const { useState, useEffect } = React;

export default function Checkout() {
  const [elementFontSize, setFontSize] = useState(window.innerWidth < 450 ? '14px' : '18px');
  useEffect(() => {
    const listener = () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        setFontSize('14px');
      } else if (window.innerWidth >= 450 && this.state.elementFontSize !== '18px') {
        setFontSize('18px');
      }
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return (
    <div className="Checkout">
      <h1>Pay with Stripe</h1>
      <Elements>
        <SplitForm fontSize={elementFontSize} />
      </Elements>
    </div>
  );
}
