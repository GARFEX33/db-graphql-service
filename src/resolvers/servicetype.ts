import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

interface ServiceTypeFilterArgs {
  filter: {
    id?: number;
    id_in?: number[];
    nombre_tipo_servicio_contains?: string;
    nombre_tipo_servicio_startsWith?: string;
    created_at?: string;
    updated_at?: string;
    mode?: string;
  };
}

export const serviceTypeResolvers = {
  Query: {
    serviceTypes: async () => prisma.serviceType.findMany(),
    findAllServiceTypes: async () => prisma.serviceType.findMany(),
    findServiceTypeById: async (_: any, { id }: { id: number }) =>
      prisma.serviceType.findUnique({ where: { id } }),
    searchServiceTypes: async (_: any, { filter }: ServiceTypeFilterArgs) => {
      const where: any = {};

      if (filter.id !== undefined) {
        where.id = filter.id;
      }

      if (filter.id_in) {
        where.id = { in: filter.id_in };
      }

      if (filter.nombre_tipo_servicio_contains) {
        where.nombre_tipo_servicio = {
          contains: filter.nombre_tipo_servicio_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.nombre_tipo_servicio_startsWith) {
        where.nombre_tipo_servicio = {
          startsWith: filter.nombre_tipo_servicio_startsWith,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.created_at) {
        where.created_at = filter.created_at;
      }

      if (filter.updated_at) {
        where.updated_at = filter.updated_at;
      }

      return prisma.serviceType.findMany({ where });
    },
  },
  Mutation: {
    createServiceType: async (_: any, args: ResolverArgs, context: ResolverContext) => {
      return prisma.serviceType.create({
        data: {
          nombre_tipo_servicio: args.input.nombre_tipo_servicio,
        },
      });
    },
    updateServiceType: async (_: any, { id, input }: { id: number; input: any }, context: ResolverContext) => {
      return prisma.serviceType.update({
        where: { id },
        data: {
          nombre_tipo_servicio: input.nombre_tipo_servicio,
        },
      });
    },
    deleteServiceType: async (_: any, { id }: { id: number }, context: ResolverContext) => {
      return prisma.serviceType.delete({
        where: { id },
      });
    },
  },
  ServiceType: {
    archivos: async (parent: any) => prisma.file.findMany({ where: { tipo_servicio_id: parent.id } }),
  },
};