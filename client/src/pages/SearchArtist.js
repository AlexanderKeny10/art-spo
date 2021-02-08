import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, } from 'react-bootstrap';
import { searchGoogleArtists, searchGoogleArtworks} from '../utils/API';
import { saveArtistIds, getSavedArtistIds } from '../utils/localStorage';
import { SAVE_ARTIST } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';

const SearchArtists = () => {

  const [searchedArtists, setSearchedArtists] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved artistId values
  const [savedArtistIds, setSavedArtistIds] = useState(getSavedArtistIds());

  // const [artistData, setArtistData] = useState([])

  // set up useEffect hook to save `savedArtistIds` list to localStorage on component unmount
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
        let response = await searchGoogleArtists(searchInput);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        // console.log(await response.json())
        let items = await response.json();
   

        const artistData = items.records.map((artist) => ({
          key: artist.personid,
          displayname: artist.displayname,
          url: artist.url,
          culture: artist.culture
        }))
        
        
        for( let i = 0; i < artistData.length; i++) {
          response = await searchGoogleArtworks(artistData[i].key) 
          if (!response.ok) {
            throw new Error('something went wrong!');
          }
          items = await response.json();
          console.log(items)
          for( let j = 0; j < items.records.length; j++) {
            if (items.records[j].imagecount === 0) {
              continue 
            }
            artistData[i].imgArt = items.records[j].primaryimageurl+'?height=300&width=300'
          }

        }
        console.log(artistData)
        setSearchedArtists(artistData)
        setSearchInput('')
      } catch (err) {
        console.error(err);
      }
    }


    //   fetch(`https://api.harvardartmuseums.org/Person/?apikey=c45cc63e-c074-4a0d-b51d-5dc1dc869c9d`)
    //     .then(res => res.json())
    //     .then((data) => {
    //       data.records.map((artist) => {

    //       })
    //     })
    //     .catch((err) => {

    //     });

    // }

    // try {
    // fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchInput}&fields=image_id`)
    //   .then(
    //     res => {
    //       res.body.getReader().read()
    //         .then(data => {
    //           let artistData = JSON.parse(new TextDecoder("utf-8").decode(data.value));
    //           // featch(`https://api.artic.edu/api/v1/artworks/search?q=`)
    //           console.log(artistData)
    //           const imageSources = artistData.data.map((artist) => {
    //             const src = `https://www.artic.edu/iiif/2/${artist.image_id}/full/843,/0/default.jpg`;
    //             return { src }
    //           });
    //           setArtistData(imageSources);
    //         })
    //     }
    //   )

    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

    //   setSearchedArtists(artistData);
    //   setSearchInput('');

    const [saveArtist] = useMutation(SAVE_ARTIST);

    // create function to handle saving a artist to our database
    const handleSaveArtist = async (artistId) => {
      // find the artist in `searchedArtists` state by the matching id
      const artistToSave = searchedArtists.find((artist) => artist.artistId === artistId);

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
        <Jumbotron fluid className='text-dark bg-light'>
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
                  <Button className='btn-submit btn-lg' type='submit' variant='success' size='lg'>
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
              : 'Search for an artist to begin'}
          </h2>
          
          {/* {
            artistData.map((artistSrc) => {
              return (
                <div style={{ width: '20%', height: '20%' }}>
                  <img src={artistSrc.src}></img> 
                  <p src={artistSrc.src}></p>
                </div>
              )
            })
          } */}
          {searchedArtists.map((artist) => {
            return (
              <Card key={artist.key} border='dark'>

                <Card.Body>
                  <Card.Title>{artist.displayname}</Card.Title>
                  <p className='small'>Authors: {artist.displayname}</p>
                  <Card.Text>{artist.culture}</Card.Text>
                  <img 
                    alt= {'find art here '+artist.url}
                    src={console.log(artist.url)|| artist.imgArt}>
                  </img>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedArtistIds?.some((savedArtistId) => savedArtistId === artist.key)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveArtist(artist.key)}>
                      {savedArtistIds?.some((savedArtistId) => savedArtistId === artist.key)
                        ? 'This artist has already been saved!'
                        : 'Save this Artist!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </>
    );
  };

  export default SearchArtists;
