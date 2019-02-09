import React from 'react'
import { injectStripe, IdealBankElement } from 'react-stripe-elements'

const handleBlur = () => {
  console.log('[blur]')
}
const handleChange = change => {
  console.log('[change]', change)
}
const handleFocus = () => {
  console.log('[focus]')
}
const handleReady = () => {
  console.log('[ready]')
}

const createOptions = (fontSize, padding) => ({
  style: {
    base: {
      fontSize,
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4'
      },
      ...(padding ? { padding } : {})
    },
    invalid: {
      color: '#9e2146'
    }
  }
})

class IdealBankForm extends React.Component {
  handleSubmit = ev => {
    console.log(ev)
    ev.preventDefault()
    if (this.props.stripe) {
      this.props.stripe
        .createSource({
          type: 'ideal',
          amount: 1099,
          currency: 'eur',
          owner: {
            name: ev.target.name.value
          },
          redirect: {
            return_url: 'http://localhost:3000'
          }
        })
        .then(payload => {
          console.log('[source]', payload)
        })
    } else {
      console.log("Stripe.js hasn't loaded yet.")
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
            {...createOptions(this.props.fontSize, '10px 14px')}
          />
        </label>
        <button onClick={this.handleSubmit} type="button">
          Pay
        </button>
      </form>
    )
  }
}

export default injectStripe(IdealBankForm)
