import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser( username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_ARTIST = gql`
    mutation saveArtist($artistData: ArtistInput!) {
        saveArtist(artistData: $artistData) {
            _id
            username
            email
            artistCount
            savedArtist {
                key
                displayname
                url
                culture 
            }
        }
    }
`;

export const REMOVE_ARTIST = gql`
    mutation removeArtist($artistId: ID!) {
        removeArtist(artistId: $artistId) {
                _id
                username
                artCount
                savedArtist {
                    key
                    displayname
                    url
                    culture
            }
        }
    }
`;
