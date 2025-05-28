import { ApolloServer } from 'apollo-server';
import { mergedTypeDefs } from './schema';
import { mergedResolvers } from './resolvers';
import { context } from './context';

const server = new ApolloServer({ typeDefs: mergedTypeDefs, resolvers: mergedResolvers, context });

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor listo en ${url}`);
});
