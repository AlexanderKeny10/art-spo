import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { REMOVE_ARTIST } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { removeArtistId } from '../utils/localStorage';


const SavedArtist = () => {

  const [removeArtist] = useMutation(REMOVE_ARTIST);
  const { loading, data } = useQuery(GET_ME);
 
  const userData = data?.me || {};
  console.log(userData);

  const handleDeleteArtist = async (artistId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(artistId)
    if (!token) {
      return false;
    }

    try {
      const { data } = await removeArtist({
        variables: { artistId: artistId }
      });

      console.log(data);
      console.log(artistId);

      removeArtistId(artistId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved Artists!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.SavedArtist?.length
            ? `Viewing ${userData.savedArtist.length} saved ${userData.savedArtist.length === 1 ? 'artist' : 'artist'}:`
            : 'You have no saved artist!'}
        </h2>
        <CardColumns>
            {userData.savedArtist.map((artist) => {
            return (
              <Card key={artist.artistId} border='dark'>
                {artist.image ? <Card.Img src={artist.image} alt={`The cover for ${artist.name}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{artist.name}</Card.Title>
                  <p className='small'>Authors: {artist.name}</p>
                  <Card.Text>{artist.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteArtist(artist.artistId)}>
                    Delete this Artist!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedArtist;
