import React from 'react'
import { Elements } from 'react-stripe-elements'
import CardForm from './CardForm'
import SplitForm from './SplitForm'
import PaymentRequestForm from './PaymentRequestForm'
import IbanForm from './IbanForm'
import IdealBankForm from './IdealBankForm'

export default class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px'
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' })
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({ elementFontSize: '18px' })
      }
    })
  }

  render() {
    const { elementFontSize } = this.state
    return (
      <div className="Checkout">
        <h1>Available Elements</h1>
        <Elements>
          <CardForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <SplitForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <PaymentRequestForm />
        </Elements>
        <Elements>
          <IbanForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <IdealBankForm fontSize={elementFontSize} />
        </Elements>
      </div>
    )
  }
}
