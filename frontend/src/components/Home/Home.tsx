import * as React from 'react';
import styled from '@emotion/styled';

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
`;

const Home = () => <Wrapper>Choose payment system to test</Wrapper>;

export default Home;
