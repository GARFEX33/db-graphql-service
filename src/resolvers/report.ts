import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

interface ReportFilterArgs {
  filter: {
    id?: number;
    id_in?: number[];
    nombre_contains?: string;
    nombre_startsWith?: string;
    reporte_url_contains?: string;
    reporte_url_startsWith?: string;
    foto_antes_url_contains?: string;
    foto_despues_url_contains?: string;
    termo_antes_url_contains?: string;
    termo_despues_url_contains?: string;
    reporte_contains?: string;
    created_at?: string;
    updated_at?: string;
    mode?: string;
  };
}

export const reportResolvers = {
  Query: {
    reports: async () => prisma.report.findMany(),
    findAllReports: async () => prisma.report.findMany(),
    findReportById: async (_: any, { id }: { id: number }) =>
      prisma.report.findUnique({ where: { id } }),
    searchReports: async (_: any, { filter }: ReportFilterArgs) => {
      const where: any = {};

      if (filter.id !== undefined) {
        where.id = filter.id;
      }

      if (filter.id_in) {
        where.id = { in: filter.id_in };
      }

      if (filter.nombre_contains) {
        where.nombre = {
          contains: filter.nombre_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.nombre_startsWith) {
        where.nombre = {
          startsWith: filter.nombre_startsWith,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.reporte_url_contains) {
        where.reporte_url = {
          contains: filter.reporte_url_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.reporte_url_startsWith) {
        where.reporte_url = {
          startsWith: filter.reporte_url_startsWith,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.foto_antes_url_contains) {
        where.foto_antes_url = {
          contains: filter.foto_antes_url_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.foto_despues_url_contains) {
        where.foto_despues_url = {
          contains: filter.foto_despues_url_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.termo_antes_url_contains) {
        where.termo_antes_url = {
          contains: filter.termo_antes_url_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.termo_despues_url_contains) {
        where.termo_despues_url = {
          contains: filter.termo_despues_url_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.reporte_contains) {
        where.reporte = {
          contains: filter.reporte_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.created_at) {
        where.created_at = filter.created_at;
      }

      if (filter.updated_at) {
        where.updated_at = filter.updated_at;
      }

      return prisma.report.findMany({ where });
    },
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
    updateReport: async (_: any, { id, input }: { id: number; input: any }, context: ResolverContext) => {
      return prisma.report.update({
        where: { id },
        data: {
          nombre: input.nombre,
          reporte_url: input.reporte_url,
          foto_antes_url: input.foto_antes_url,
          foto_despues_url: input.foto_despues_url,
          termo_antes_url: input.termo_antes_url,
          termo_despues_url: input.termo_despues_url,
          reporte: input.reporte,
        },
      });
    },
    deleteReport: async (_: any, { id }: { id: number }, context: ResolverContext) => {
      return prisma.report.delete({
        where: { id },
      });
    },
  },
};