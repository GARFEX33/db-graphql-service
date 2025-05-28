import { gql } from 'apollo-server-core';

export const clientTypeDefs = gql`
  type Client {
    id: Int!
    nombre_cliente: String!
    detalles: String
    created_at: String!
    updated_at: String!
    archivos: [File!]!
  }

  input CreateClientInput {
    nombre_cliente: String!
    detalles: String
  }

  extend type Query {
    clients: [Client!]!
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
  }
`;