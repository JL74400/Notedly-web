import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';
import { NEW_NOTE } from '../gql/mutation';

const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note - Notedly';
  });
  const [newNote, { loading, error }] = useMutation(NEW_NOTE, {
    // refetch the GET_NOTES to update the cache
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: () => { // () instead of data since use no argument
      // props.history.push(`note/${data.newNote.id}`); I prefer to go to mynotes
      props.history.push('/mynotes');
    }
  });

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note!</p>}
      <NoteForm action={newNote} />
    </React.Fragment>
  );
};
export default NewNote;
