import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { searchGoogleArtists } from '../utils/API';
import { saveArtistIds, getSavedArtistIds } from '../utils/localStorage';
import { SAVE_ARTIST }  from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';

const SearchArtists = () => {
  // create state for holding returned google api data
  const [searchedArtists, setSearchedArtists] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved artistId values
  const [savedArtistIds, setSavedArtistIds] = useState(getSavedArtistIds());

  // set up useEffect hook to save `savedArtistIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveArtistIds(savedArtistIds);
  });

  // create method to search for artists and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleArtists(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const artistData = items.map((artist) => ({
        artistId: artist.id,
        authors: artist.volumeInfo.authors || ['No author to display'],
        title: artist.volumeInfo.title,
        description: artist.volumeInfo.description,
        image: artist.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedArtists(artistData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const [saveArtist] = useMutation(SAVE_ARTIST);

  // create function to handle saving a artist to our database
  const handleSaveArtist = async (artistId) => {
    // find the artist in `searchedArtists` state by the matching id
    const ArtistToSave = searchedArtists.find((artist) => artist.artistId === artistId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log(artistToSave)

      const { data } = await saveArtist({
        variables: { artistData: { ...artistToSave } },
      });

      console.log(data)

      // if artist successfully saves to user's account, save artist id to state
      setSavedArtistIds([...savedArtistIds, artistToSave.artistId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Artists!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for an artist'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedArtists.length
            ? `Viewing ${searchedArtists.length} results:`
            : 'Search for a artist to begin'}
        </h2>
        <CardColumns>
          {searchedArtists.map((artist) => {
            return (
              <Card key={artist.artistId} border='dark'>
                {artist.image ? (
                  <Card.Img src={artist.image} alt={`The cover for ${artist.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{artist.title}</Card.Title>
                  <p className='small'>Authors: {artist.authors}</p>
                  <Card.Text>{artist.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedArtistIds?.some((savedArtistId) => savedArtistId === artist.artistId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveArtist(artist.artistId)}>
                      {savedArtistIds?.some((savedArtistId) => savedArtistId === artist.artistId)
                        ? 'This artist has already been saved!'
                        : 'Save this Artist!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchArtists;