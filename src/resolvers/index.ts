import { clientResolvers } from './client';
import { locationResolvers } from './location';
import { fileResolvers } from './file';
import { reportResolvers } from './report';
import { serviceTypeResolvers } from './servicetype';

export const mergedResolvers = [
  clientResolvers,
  locationResolvers,
  fileResolvers,
  reportResolvers,
  serviceTypeResolvers,
];
