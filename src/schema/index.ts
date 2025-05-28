import { gql } from 'apollo-server-core';
import { clientTypeDefs } from './client';
import { locationTypeDefs } from './location';
import { fileTypeDefs } from './file';
import { reportTypeDefs } from './report';
import { serviceTypeDefs } from './servicetype';

export const typeDefs = gql`
  type Query
  type Mutation
`;

export const mergedTypeDefs = [
  typeDefs,
  clientTypeDefs,
  locationTypeDefs,
  fileTypeDefs,
  reportTypeDefs,
  serviceTypeDefs,
];
