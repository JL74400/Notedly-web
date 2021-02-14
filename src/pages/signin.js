import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';
import { SIGNIN_USER } from '../gql/mutation';

const SignIn = props => {
  useEffect(() => {
    document.title = 'Sign in - Notedly';
  });

  // to be able to use client.writeData
  const client = useApolloClient();

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn[0]); // store the token
      localStorage.setItem('username', data.signIn[1]); // store the username - JL's add!!
      client.writeData({ data: { isLoggedIn: true } }); // update the local cache
      // JL'smod: redirect user where he wanted to go before login. Original: ...push('/')
      props.history.push(props.location.state ? props.location.state.from : '/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
