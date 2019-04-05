import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const HomeIcon = require('../../assets/img/home.svg') as string;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  background: #00d0ff;
`;

const StyledHomeIcon = styled.img`
  margin-top: 14px;
  height: 28px;
  width: 28px;
`;

const StyledLink = styled(NavLink)`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  line-height: 64px;
  text-align: center;
  width: 100%;
  height: 100%;
  color: #fff;
  text-decoration: none;
  transition: all ease 300ms;
  &.active,
  &:hover {
    background: #0090b1;
  }
`;

const HomeLink = styled(StyledLink)`
  min-width: 80px;
  width: 80px;
`;

export default function Header() {
  return (
    <Wrapper>
      <HomeLink isActive={(_: any, { pathname }: any) => pathname === '/'} to="/">
        <StyledHomeIcon src={HomeIcon} />
      </HomeLink>
      <StyledLink to="/braintree">Braintree</StyledLink>
      <StyledLink to="/stripe">Stripe</StyledLink>
      <StyledLink to="/paypal">PayPal</StyledLink>
    </Wrapper>
  );
}
