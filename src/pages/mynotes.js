import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const myNotes = () => {
  useEffect(() => {
    document.title = 'My Notes - Notedly';
  });
  const { data, loading, error } = useQuery(GET_MY_NOTES);
  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;
  if (data.me.notes.length !== 0) return <NoteFeed notes={data.me.notes} />;
  return <p>No notes yet</p>;
};

export default myNotes;
