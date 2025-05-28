import { gql } from 'apollo-server-core';

export const locationTypeDefs = gql`
  type Location {
    id: Int!
    nombre_lugar: String!
    direccion: String
    detalles: String
    created_at: String!
    updated_at: String!
    archivos: [File!]!
  }

  input CreateLocationInput {
    nombre_lugar: String!
    direccion: String
    detalles: String
  }

  extend type Query {
    locations: [Location!]!
  }

  extend type Mutation {
    createLocation(input: CreateLocationInput!): Location!
  }
`;