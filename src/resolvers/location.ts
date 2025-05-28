import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

export const locationResolvers = {
  Query: {
    locations: async () => prisma.location.findMany(),
  },
  Mutation: {
    createLocation: async (_: any, args: ResolverArgs, context: ResolverContext) => {
      return prisma.location.create({
        data: {
          nombre_lugar: args.input.nombre_lugar,
          direccion: args.input.direccion,
          detalles: args.input.detalles,
        },
      });
    },
  },
  Location: {
    archivos: async (parent: any) => prisma.file.findMany({ where: { lugar_id: parent.id } }),
  },
};