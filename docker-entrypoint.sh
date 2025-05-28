#!/bin/sh

echo "✅ PostgreSQL listo"

echo "🧪 Buscando migraciones existentes..."
echo "📁 Contenido de prisma/schema/migrations:"

MIGRATIONS_EXIST=$(find ./prisma/schema/migrations/ -type f -name '*.sql' | wc -l)
echo "🔢 Total de archivos .sql encontrados: $MIGRATIONS_EXIST"

if [ "$MIGRATIONS_EXIST" -eq 0 ]; then
  echo "🧱 No hay migraciones. Generando 'init'..."
  npx prisma generate
  npx prisma migrate dev --name init 
  echo "📝 Migración 'init' creada.
  "
else
  echo "📦 Migraciones encontradas. Ejecutando 'dev' para detectar cambios..."
  npx prisma generate
  npx prisma migrate dev --name "migracion_numero_$MIGRATIONS_EXIST"
fi

echo "🔄 Generando cliente Prisma"
npx prisma generate

echo "🟢 Ejecutando servidor"
npx ts-node src/index.ts
