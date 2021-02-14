/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';
import NoteForm from '../components/NoteForm';

// eslint-disable-next-line arrow-body-style
const EditNote = props => {
  // store the id found in the URL as a variable
  const id = props.match.params.id;
  useEffect(() => {
    document.title = `Edit note: ${id} - Notedly`;
  });
  // define note query
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  // fetch current user's data
  const { data: userdata } = useQuery(GET_ME);
  // define our mutation
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: { id },
    onCompleted: () => { // () instead of data since use no argument
      // props.history.push(`/note/${id}`); prefer to go to mynotes
      props.history.push('/mynotes');
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!  Note not found</p>;
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
