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

  input UpdateServiceTypeInput {
    nombre_tipo_servicio: String
  }

  input ServiceTypeFilterInput {
    id: Int
    id_in: [Int!]
    nombre_tipo_servicio_contains: String
    nombre_tipo_servicio_startsWith: String
    created_at: String
    updated_at: String
    mode: String
  }

  extend type Query {
    serviceTypes: [ServiceType!]!
    findAllServiceTypes: [ServiceType!]!
    findServiceTypeById(id: Int!): ServiceType
    searchServiceTypes(filter: ServiceTypeFilterInput): [ServiceType!]!
  }

  extend type Mutation {
    createServiceType(input: CreateServiceTypeInput!): ServiceType!
    updateServiceType(id: Int!, input: UpdateServiceTypeInput!): ServiceType!
    deleteServiceType(id: Int!): ServiceType!
  }
`;