import { gql } from 'apollo-server-core';

export const serviceTypeDefs = gql`
  type ServiceType {
    id: Int!
    nombre_tipo_servicio: String!
    created_at: String!
    updated_at: String!
    archivos: [File!]!
  }

  input CreateServiceTypeInput {
    nombre_tipo_servicio: String!
  }

  extend type Query {
    serviceTypes: [ServiceType!]!
  }

  extend type Mutation {
    createServiceType(input: CreateServiceTypeInput!): ServiceType!
  }
`;