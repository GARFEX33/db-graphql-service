import { gql } from 'apollo-server-core';

export const clientTypeDefs = gql`
  type Client {
    id: Int!
    nombre_cliente: String!
    created_at: String!
    updated_at: String!
    archivos: [File!]!
  }

  input CreateClientInput {
    nombre_cliente: String!
  }

  input UpdateClientInput {
    nombre_cliente: String
  }

  input ClientFilterInput {
    id: Int
    id_in: [Int!]
    nombre_cliente_contains: String
    nombre_cliente_startsWith: String
    created_at: String
    updated_at: String
    mode: String
  }

  extend type Query {
    clients: [Client!]!
    findAllClients: [Client!]!
    findClientById(id: Int!): Client
    searchClients(filter: ClientFilterInput): [Client!]!
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
    updateClient(id: Int!, input: UpdateClientInput!): Client!
    deleteClient(id: Int!): Client!
  }
`;