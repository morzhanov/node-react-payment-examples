import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from '../shared/Header/Header'
import Container from '../shared/Container/Container'

const Profile = ({ uiStore }) => (
  <>
    <Header title="Profile page" />
    <Container content={uiStore.user.name} />
  </>
)

export default inject('uiStore')(observer(Profile))
