/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';
import { SIGNUP_USER } from '../gql/mutation';

const SignUp = props => {
  useEffect(() => {
    document.title = 'Sign up - Notedly';
  });

  // to be able to use client.writeData
  const client = useApolloClient();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp[0]); // store the token
      localStorage.setItem('username', data.signUp[1]); // store the username - JL's add!!
      client.writeData({ data: { isLoggedIn: true } }); // update the local cache
      props.history.push('/'); // redirect user to home page
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
