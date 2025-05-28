import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

export const serviceTypeResolvers = {
  Query: {
    serviceTypes: async () => prisma.serviceType.findMany(),
  },
  Mutation: {
    createServiceType: async (_: any, args: ResolverArgs, context: ResolverContext) => {
      return prisma.serviceType.create({
        data: {
          nombre_tipo_servicio: args.input.nombre_tipo_servicio,
        },
      });
    },
  },
  ServiceType: {
    archivos: async (parent: any) => prisma.file.findMany({ where: { tipo_servicio_id: parent.id } }),
  },
};