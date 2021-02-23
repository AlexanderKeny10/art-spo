const { gql } = require('apollo-server-express');

// make sure to include a difference between 'saveArtist' and 'savedArtist'.
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        artistCount: Int
        savedArtist: [Artist]
    }

    type Artist {
        key: ID!
        displayname: String
        url: String
        culture: String
    }

    input ArtistInput {
        key: Int!
        displayname: String
        url: String
        culture: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        me: User
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveArtist(artistData: ArtistInput!): User
        removeArtist(artistId: ID!): User
    }
`;

module.exports = typeDefs;