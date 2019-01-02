import React from 'react'
import { inject, observer } from 'mobx-react'

const Home = ({ uiStore }) => <></>

export default inject('uiStore')(observer(Home))
