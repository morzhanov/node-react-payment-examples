import React from 'react'
import { Elements } from 'react-stripe-elements'
import SplitForm from './SplitForm'

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
        <h1>Pay with Stripe</h1>
        <Elements>
          <SplitForm fontSize={elementFontSize} />
        </Elements>
      </div>
    )
  }
}
