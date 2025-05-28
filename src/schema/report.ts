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

  input UpdateReportInput {
    nombre: String
    reporte_url: String
    foto_antes_url: String
    foto_despues_url: String
    termo_antes_url: String
    termo_despues_url: String
    reporte: String
  }

  input ReportFilterInput {
    id: Int
    id_in: [Int!]
    nombre_contains: String
    nombre_startsWith: String
    reporte_url_contains: String
    reporte_url_startsWith: String
    foto_antes_url_contains: String
    foto_despues_url_contains: String
    termo_antes_url_contains: String
    termo_despues_url_contains: String
    reporte_contains: String
    created_at: String
    updated_at: String
    mode: String
  }

  extend type Query {
    reports: [Report!]!
    findAllReports: [Report!]!
    findReportById(id: Int!): Report
    searchReports(filter: ReportFilterInput): [Report!]!
  }

  extend type Mutation {
    createReport(input: CreateReportInput!): Report!
    updateReport(id: Int!, input: UpdateReportInput!): Report!
    deleteReport(id: Int!): Report!
  }
`;