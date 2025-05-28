import { gql } from 'apollo-server-core';

export const fileTypeDefs = gql`
  type File {
    id: Int!
    nombre_original_archivo: String!
    tamano_bytes: Int!
    tipo: String!
    ruta_almacenamiento_fisico: String!
    cliente_id: Int
    lugar_id: Int
    tipo_servicio_id: Int
    analizado_con_ia: Boolean!
    es_reporte: Boolean!
    periodicidad: String
    nombre_equipo: String
    fecha_realizacion_servicio: String
    subido_por_usuario_id: String
    fecha_subida: String!
    updated_at: String!
    cliente: Client
    lugar: Location
    tipo_servicio: ServiceType
  }

  input CreateFileInput {
    nombre_original_archivo: String!
    tamano_bytes: Int!
    tipo: String!
    ruta_almacenamiento_fisico: String!
    cliente_id: Int
    lugar_id: Int
    tipo_servicio_id: Int
    analizado_con_ia: Boolean
    es_reporte: Boolean
    periodicidad: String
    nombre_equipo: String
    fecha_realizacion_servicio: String
    subido_por_usuario_id: String
  }

  input UpdateFileInput {
    nombre_original_archivo: String
    tamano_bytes: Int
    tipo: String
    ruta_almacenamiento_fisico: String
    cliente_id: Int
    lugar_id: Int
    tipo_servicio_id: Int
    analizado_con_ia: Boolean
    es_reporte: Boolean
    periodicidad: String
    nombre_equipo: String
    fecha_realizacion_servicio: String
    subido_por_usuario_id: String
  }

  input FileFilterInput {
    id: Int
    id_in: [Int!]
    nombre_original_archivo_contains: String
    nombre_original_archivo_startsWith: String
    tipo_contains: String
    ruta_almacenamiento_fisico_contains: String
    cliente_id: Int
    lugar_id: Int
    tipo_servicio_id: Int
    analizado_con_ia: Boolean
    es_reporte: Boolean
    periodicidad: String
    nombre_equipo_contains: String
    fecha_realizacion_servicio: String
    subido_por_usuario_id: String
    fecha_subida: String
    updated_at: String
    mode: String
  }

  extend type Query {
    files: [File!]!
    findAllFiles: [File!]!
    findFileById(id: Int!): File
    searchFiles(filter: FileFilterInput): [File!]!
  }

  extend type Mutation {
    createFile(input: CreateFileInput!): File!
    updateFile(id: Int!, input: UpdateFileInput!): File!
    deleteFile(id: Int!): File!
  }
`;