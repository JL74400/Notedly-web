/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOTES } from '../gql/query';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

const Home = () => {
  useEffect(() => {
    document.title = 'Home - Notedly';
  });
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
            // eslint-disable-next-line implicit-arrow-linebreak
            fetchMore({
              variables: { cursor: data.noteFeed.cursor },
              // eslint-disable-next-line arrow-body-style
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes,
                    ],
                    _typename: 'noteFeed',
                  },
                };
              },
            })
          // eslint-disable-next-line react/jsx-curly-newline
          }
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
