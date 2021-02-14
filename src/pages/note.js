/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOTE } from '../gql/query';

import Note from '../components/Note';

// eslint-disable-next-line arrow-body-style
const NotePage = ({ match }) => {
  // eslint-disable-next-line prefer-destructuring
  const id = match.params.id;
  useEffect(() => {
    document.title = `Note: ${id} - Notedly`;
  });
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return <Note note={data.note} />;
};

export default NotePage;
