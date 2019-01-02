import React from 'react'
import { inject, observer } from 'mobx-react'

const Braintree = ({ uiStore }) => <>Braintree</>

export default inject('uiStore')(observer(Braintree))
