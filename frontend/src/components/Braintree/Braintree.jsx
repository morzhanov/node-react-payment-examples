import React from 'react'
import axios from 'axios'
import DropIn from 'braintree-web-drop-in-react'

class Braintree extends React.Component {
  state = {
    clientToken: null
  }

  async componentDidMount() {
    // Get a client token for authorization from your server
    const { data } = await axios.get(
      'http://localhost:4000/payment/braintree/token/'
    )
    const { clientToken } = data
    console.log('Braintree token received: ', clientToken)

    this.setState({
      clientToken
    })
  }

  instance

  async buy() {
    // Send the nonce to your server
    const { nonce } = await this.instance.requestPaymentMethod()
    const { data } = await axios.post(
      'http://localhost:4000/payment/braintree',
      {
        nonce,
        amount: 100,
        email: 'vlad.morzhanov@gmail.com'
      }
    )
    console.log('Braintree payment accepted: ', data)
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
    return (
      <div>
        <DropIn
          options={{ authorization: this.state.clientToken }}
          onInstance={instance => {
            this.instance = instance
          }}
        />
        <button type="button" onClick={this.buy.bind(this)}>
          Buy
        </button>
      </div>
    )
  }
}

export default Braintree
