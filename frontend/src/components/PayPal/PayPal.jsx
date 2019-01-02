import React from 'react'
import { inject, observer } from 'mobx-react'

const PayPal = ({ uiStore }) => <>PayPal</>

export default inject('uiStore')(observer(PayPal))
