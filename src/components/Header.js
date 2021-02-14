import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';

import logo from '../img/logo.svg';

const IS_LOGGED_IN = gql`
  { isLoggedIn @client }
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

// eslint-disable-next-line arrow-body-style
// could simply do: const data = localStorage.getItem('token'); and forget the gql Query!!
const Header = props => {
  const { data, client } = useQuery(IS_LOGGED_IN);

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      <UserState>
        {data.isLoggedIn ? (
          <p>
            <em><b>{localStorage.getItem('username')}</b></em> -{' '}
            <ButtonAsLink
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                client.resetStore();
                client.writeData({ data: { isLoggedIn: false } });
                props.history.push('/');
              }}
            >
              Logout
            </ButtonAsLink>
          </p>
        ) : (
          <p>
            <Link to="/signin">Sign In</Link> or{' '}
            <Link to="/signup">Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);
