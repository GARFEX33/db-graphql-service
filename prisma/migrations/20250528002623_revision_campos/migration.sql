/*
  Warnings:

  - You are about to drop the column `hash_contenido` on the `Archivos` table. All the data in the column will be lost.
  - You are about to drop the column `metadatos_adicionales` on the `Archivos` table. All the data in the column will be lost.
  - You are about to drop the column `mime_type` on the `Archivos` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_archivo_almacenado` on the `Archivos` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `TiposServicio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre_original_archivo]` on the table `Archivos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tipo` to the `Archivos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Archivos_hash_contenido_key";

-- DropIndex
DROP INDEX "Archivos_nombre_archivo_almacenado_key";

-- AlterTable
ALTER TABLE "Archivos" DROP COLUMN "hash_contenido",
DROP COLUMN "metadatos_adicionales",
DROP COLUMN "mime_type",
DROP COLUMN "nombre_archivo_almacenado",
ADD COLUMN     "tipo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TiposServicio" DROP COLUMN "descripcion";

-- CreateIndex
CREATE UNIQUE INDEX "Archivos_nombre_original_archivo_key" ON "Archivos"("nombre_original_archivo");
