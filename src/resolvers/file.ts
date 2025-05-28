import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

export const fileResolvers = {
  Query: {
    files: async () => prisma.file.findMany(),
  },
  Mutation: {
    createFile: async (_: any, args: ResolverArgs, context: ResolverContext) => {
      return prisma.file.create({
        data: {
          nombre_original_archivo: args.input.nombre_original_archivo,
          tamano_bytes: args.input.tamano_bytes,
          tipo: args.input.tipo,
          ruta_almacenamiento_fisico: args.input.ruta_almacenamiento_fisico,
          cliente_id: args.input.cliente_id,
          lugar_id: args.input.lugar_id,
          tipo_servicio_id: args.input.tipo_servicio_id,
          analizado_con_ia: args.input.analizado_con_ia,
          es_reporte: args.input.es_reporte,
          periodicidad: args.input.periodicidad,
          nombre_equipo: args.input.nombre_equipo,
          fecha_realizacion_servicio: args.input.fecha_realizacion_servicio,
          subido_por_usuario_id: args.input.subido_por_usuario_id,
        },
      });
    },
  },
  File: {
    cliente: async (parent: any) => prisma.client.findUnique({ where: { id: parent.cliente_id } }),
    lugar: async (parent: any) => prisma.location.findUnique({ where: { id: parent.lugar_id } }),
    tipo_servicio: async (parent: any) =>
      prisma.serviceType.findUnique({ where: { id: parent.tipo_servicio_id } }),
  },
};