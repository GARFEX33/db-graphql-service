import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

export const reportResolvers = {
  Query: {
    reports: async () => prisma.report.findMany(),
  },
  Mutation: {
    createReport: async (_: any, args: ResolverArgs, context: ResolverContext) => {
      return prisma.report.create({
        data: {
          nombre: args.input.nombre,
          reporte_url: args.input.reporte_url,
          foto_antes_url: args.input.foto_antes_url,
          foto_despues_url: args.input.foto_despues_url,
          termo_antes_url: args.input.termo_antes_url,
          termo_despues_url: args.input.termo_despues_url,
          reporte: args.input.reporte,
        },
      });
    },
  },
};