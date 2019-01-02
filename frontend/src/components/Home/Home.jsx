import React from 'react'
import { inject, observer } from 'mobx-react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
`

const Home = ({ uiStore }) => <Wrapper>Choose payment system to test</Wrapper>

export default inject('uiStore')(observer(Home))
