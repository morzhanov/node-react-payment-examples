import React from 'react'
import { inject, observer } from 'mobx-react'

const Stripe = ({ uiStore }) => <>Stripe</>

export default inject('uiStore')(observer(Stripe))
