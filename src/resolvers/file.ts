import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResolverContext {
  prisma: PrismaClient;
}

interface ResolverArgs {
  input: any;
}

interface FileFilterArgs {
  filter: {
    id?: number;
    id_in?: number[];
    nombre_original_archivo_contains?: string;
    nombre_original_archivo_startsWith?: string;
    tipo_contains?: string;
    ruta_almacenamiento_fisico_contains?: string;
    cliente_id?: number;
    lugar_id?: number;
    tipo_servicio_id?: number;
    analizado_con_ia?: boolean;
    es_reporte?: boolean;
    periodicidad?: string;
    nombre_equipo_contains?: string;
    fecha_realizacion_servicio?: string;
    subido_por_usuario_id?: string;
    fecha_subida?: string;
    updated_at?: string;
    mode?: string;
  };
}

export const fileResolvers = {
  Query: {
    files: async () => prisma.file.findMany(),
    findAllFiles: async () => prisma.file.findMany(),
    findFileById: async (_: any, { id }: { id: number }) =>
      prisma.file.findUnique({ where: { id } }),
    searchFiles: async (_: any, { filter }: FileFilterArgs) => {
      const where: any = {};

      if (filter.id !== undefined) {
        where.id = filter.id;
      }

      if (filter.id_in) {
        where.id = { in: filter.id_in };
      }

      if (filter.nombre_original_archivo_contains) {
        where.nombre_original_archivo = {
          contains: filter.nombre_original_archivo_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.nombre_original_archivo_startsWith) {
        where.nombre_original_archivo = {
          startsWith: filter.nombre_original_archivo_startsWith,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.tipo_contains) {
        where.tipo = {
          contains: filter.tipo_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.ruta_almacenamiento_fisico_contains) {
        where.ruta_almacenamiento_fisico = {
          contains: filter.ruta_almacenamiento_fisico_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.cliente_id !== undefined) {
        where.cliente_id = filter.cliente_id;
      }

      if (filter.lugar_id !== undefined) {
        where.lugar_id = filter.lugar_id;
      }

      if (filter.tipo_servicio_id !== undefined) {
        where.tipo_servicio_id = filter.tipo_servicio_id;
      }

      if (filter.analizado_con_ia !== undefined) {
        where.analizado_con_ia = filter.analizado_con_ia;
      }

      if (filter.es_reporte !== undefined) {
        where.es_reporte = filter.es_reporte;
      }

      if (filter.periodicidad) {
        where.periodicidad = filter.periodicidad;
      }

      if (filter.nombre_equipo_contains) {
        where.nombre_equipo = {
          contains: filter.nombre_equipo_contains,
          mode: filter.mode || 'insensitive',
        };
      }

      if (filter.fecha_realizacion_servicio) {
        where.fecha_realizacion_servicio = filter.fecha_realizacion_servicio;
      }

      if (filter.subido_por_usuario_id) {
        where.subido_por_usuario_id = filter.subido_por_usuario_id;
      }

      if (filter.fecha_subida) {
        where.fecha_subida = filter.fecha_subida;
      }

      if (filter.updated_at) {
        where.updated_at = filter.updated_at;
      }

      return prisma.file.findMany({ where });
    },
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
    updateFile: async (_: any, { id, input }: { id: number; input: any }, context: ResolverContext) => {
      return prisma.file.update({
        where: { id },
        data: {
          nombre_original_archivo: input.nombre_original_archivo,
          tamano_bytes: input.tamano_bytes,
          tipo: input.tipo,
          ruta_almacenamiento_fisico: input.ruta_almacenamiento_fisico,
          cliente_id: input.cliente_id,
          lugar_id: input.lugar_id,
          tipo_servicio_id: input.tipo_servicio_id,
          analizado_con_ia: input.analizado_con_ia,
          es_reporte: input.es_reporte,
          periodicidad: input.periodicidad,
          nombre_equipo: input.nombre_equipo,
          fecha_realizacion_servicio: input.fecha_realizacion_servicio,
          subido_por_usuario_id: input.subido_por_usuario_id,
        },
      });
    },
    deleteFile: async (_: any, { id }: { id: number }, context: ResolverContext) => {
      return prisma.file.delete({
        where: { id },
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