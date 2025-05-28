import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

export const clientResolvers = {
  Query: {
    clients: async () => prisma.client.findMany(),
  },
  Mutation: {
    createClient: async (_: any, args: ResolverArgs, context: ResolverContext) => {
      return prisma.client.create({
        data: {
          nombre_cliente: args.input.nombre_cliente,
          detalles: args.input.detalles,
        },
      });
    },
  },
  Client: {
    archivos: async (parent: any) => prisma.file.findMany({ where: { cliente_id: parent.id } }),
  },
};