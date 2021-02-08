export const getSavedArtistIds = () => {
  const savedArtistIds = localStorage.getItem('saved_artist')
    ? JSON.parse(localStorage.getItem('saved_artist'))
    : [];

  return savedArtistIds;
};

export const saveArtistIds = (ArtistIdArr) => {
  if (ArtistIdArr.length) {
    localStorage.setItem('saved_artist', JSON.stringify(ArtistIdArr));
  } else {
    localStorage.removeItem('saved_artist');
  }
};

export const removeArtistId = (artistId) => {
  const savedArtistIds = localStorage.getItem('saved_artist')
    ? JSON.parse(localStorage.getItem('saved_artist'))
    : null;

  if (!savedArtistIds) {
    return false;
  }

  const updatedSavedArtistIds = savedArtistIds?.filter((savedArtistId) => savedArtistId !== artistId);
  localStorage.setItem('saved_artist', JSON.stringify(updatedSavedArtistIds));

  return true;
};
