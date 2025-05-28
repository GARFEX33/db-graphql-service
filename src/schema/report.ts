import { gql } from 'apollo-server-core';

export const reportTypeDefs = gql`
  type Report {
    id: Int!
    nombre: String!
    reporte_url: String!
    foto_antes_url: String
    foto_despues_url: String
    termo_antes_url: String
    termo_despues_url: String
    reporte: String!
    created_at: String!
    updated_at: String!
  }

  input CreateReportInput {
    nombre: String!
    reporte_url: String!
    foto_antes_url: String
    foto_despues_url: String
    termo_antes_url: String
    termo_despues_url: String
    reporte: String!
  }

  extend type Query {
    reports: [Report!]!
  }

  extend type Mutation {
    createReport(input: CreateReportInput!): Report!
  }
`;