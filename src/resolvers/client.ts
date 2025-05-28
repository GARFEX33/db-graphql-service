import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

interface ClientFilterArgs {
  filter: {
    id?: number;
    id_in?: number[];
    nombre_cliente_contains?: string;
    nombre_cliente_startsWith?: string;
    detalles_contains?: string;
    created_at?: string;
    updated_at?: string;
    mode?: string;
  };
}

export const clientResolvers = {
  Query: {
    clients: async () => prisma.client.findMany(),
    findAllClients: async () => prisma.client.findMany(),
    findClientById: async (_: any, { id }: { id: number }) =>
      prisma.client.findUnique({ where: { id } }),
    searchClients: async (_: any, { filter }: ClientFilterArgs) => {
      const where: any = {};

      if (filter.id !== undefined) {
        where.id = filter.id;
      }

      if (filter.id_in) {
        where.id = { in: filter.id_in };
      }

      if (filter.nombre_cliente_contains) {
        where.nombre_cliente = {
          contains: filter.nombre_cliente_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.nombre_cliente_startsWith) {
        where.nombre_cliente = {
          startsWith: filter.nombre_cliente_startsWith,
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

      return prisma.client.findMany({ where });
    },
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
    updateClient: async (_: any, { id, input }: { id: number; input: any }, context: ResolverContext) => {
      return prisma.client.update({
        where: { id },
        data: {
          nombre_cliente: input.nombre_cliente,
          detalles: input.detalles,
        },
      });
    },
    deleteClient: async (_: any, { id }: { id: number }, context: ResolverContext) => {
      return prisma.client.delete({
        where: { id },
      });
    },
  },
  Client: {
    archivos: async (parent: any) => prisma.file.findMany({ where: { cliente_id: parent.id } }),
  },
};