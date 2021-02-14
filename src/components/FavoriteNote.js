import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ButtonAsLinkNoUL from './ButtonAsLinkNoUL';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query'; // to refetch

const FavoriteNote = ({ me, noteId, favoriteCount }) => {
  // store the note's favorite count as state
  const [count, setCount] = useState(favoriteCount);
  // store is the user has favorited the note as state
  const [favorited, setFavorited] = useState(
    me.favorites.filter(note => note.id === noteId).length > 0
  );
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: noteId },
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLinkNoUL
          onClick={() => { // favorite will be toggled OFF on click of broken heart
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
        >
          <span aria-hidden="true" role="img">💔</span>
        </ButtonAsLinkNoUL>
      ) : (
        <ButtonAsLinkNoUL
          onClick={() => { // favorite will be toggled ON on click of solid heart
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
        >
          <span aria-hidden="true" role="img">❤️</span>
        </ButtonAsLinkNoUL>
      )}
      {' '}{count}
    </React.Fragment>
  );
};

export default FavoriteNote;
