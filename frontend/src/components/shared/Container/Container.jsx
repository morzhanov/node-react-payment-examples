import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 64px);
  width: 100%;
  color: #348599;
  font-size: 16px;
  font-weight: bold;
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const Container = ({ uiStore, content }) => (
  <Wrapper>
    {content}
    {uiStore.user.name}
  </Wrapper>
)

export default inject('uiStore')(observer(Container))
