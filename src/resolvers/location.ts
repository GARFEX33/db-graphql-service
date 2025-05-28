import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

interface LocationFilterArgs {
  filter: {
    id?: number;
    id_in?: number[];
    nombre_lugar_contains?: string;
    nombre_lugar_startsWith?: string;
    direccion_contains?: string;
    detalles_contains?: string;
    created_at?: string;
    updated_at?: string;
    mode?: string;
  };
}

export const locationResolvers = {
  Query: {
    locations: async () => prisma.location.findMany(),
    findAllLocations: async () => prisma.location.findMany(),
    findLocationById: async (_: any, { id }: { id: number }) =>
      prisma.location.findUnique({ where: { id } }),
    searchLocations: async (_: any, { filter }: LocationFilterArgs) => {
      const where: any = {};

      if (filter.id !== undefined) {
        where.id = filter.id;
      }

      if (filter.id_in) {
        where.id = { in: filter.id_in };
      }

      if (filter.nombre_lugar_contains) {
        where.nombre_lugar = {
          contains: filter.nombre_lugar_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.nombre_lugar_startsWith) {
        where.nombre_lugar = {
          startsWith: filter.nombre_lugar_startsWith,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.direccion_contains) {
        where.direccion = {
          contains: filter.direccion_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.detalles_contains) {
        where.detalles = {
          contains: filter.detalles_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.created_at) {
        where.created_at = filter.created_at;
      }

      if (filter.updated_at) {
        where.updated_at = filter.updated_at;
      }

      return prisma.location.findMany({ where });
    },
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
    updateLocation: async (_: any, { id, input }: { id: number; input: any }, context: ResolverContext) => {
      return prisma.location.update({
        where: { id },
        data: {
          nombre_lugar: input.nombre_lugar,
          direccion: input.direccion,
          detalles: input.detalles,
        },
      });
    },
    deleteLocation: async (_: any, { id }: { id: number }, context: ResolverContext) => {
      return prisma.location.delete({
        where: { id },
      });
    },
  },
  Location: {
    archivos: async (parent: any) => prisma.file.findMany({ where: { lugar_id: parent.id } }),
  },
};