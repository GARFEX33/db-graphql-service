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

  input UpdateLocationInput {
    nombre_lugar: String
    direccion: String
    detalles: String
  }

  input LocationFilterInput {
    id: Int
    id_in: [Int!]
    nombre_lugar_contains: String
    nombre_lugar_startsWith: String
    direccion_contains: String
    detalles_contains: String
    created_at: String
    updated_at: String
    mode: String
  }

  extend type Query {
    locations: [Location!]!
    findAllLocations: [Location!]!
    findLocationById(id: Int!): Location
    searchLocations(filter: LocationFilterInput): [Location!]!
  }

  extend type Mutation {
    createLocation(input: CreateLocationInput!): Location!
    updateLocation(id: Int!, input: UpdateLocationInput!): Location!
    deleteLocation(id: Int!): Location!
  }
`;