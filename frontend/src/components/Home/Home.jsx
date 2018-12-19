import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from '../shared/Header/Header'
import Container from '../shared/Container/Container'

const Home = ({ uiStore }) => (
  <>
    <Header title="Home Page" />
    <Container content="Home page content" />
    {uiStore.user.name}
  </>
)

export default inject('uiStore')(observer(Home))
