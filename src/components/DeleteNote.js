/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import ButtonAsLinkNoUL from './ButtonAsLinkNoUL';
import { DELETE_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: { id: props.noteId },
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
    onCompleted: () => {
      props.history.push('/mynotes');
    }
  });
  return (
    <ButtonAsLinkNoUL onClick={deleteNote}>
      <span aria-hidden="true" role="img">❌</span>
    </ButtonAsLinkNoUL>
  );
};

export default withRouter(DeleteNote);
