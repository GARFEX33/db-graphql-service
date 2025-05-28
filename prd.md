# Overview

Microservicio `db-graphql-service` para exponer vía GraphQL una base de datos centralizada del sistema de reportes de mantenimiento automatizados. Permite a los demás microservicios acceder y modificar información estructurada como fotos, metadatos, resultados de análisis y reportes. Su valor está en centralizar el acceso estructurado y validado a los datos, desacoplando la lógica de almacenamiento de los microservicios consumidores.

# Core Features

* **Exposición de datos vía GraphQL**

  * Usa Apollo Server en TypeScript para consultas y mutaciones.
  * Define esquemas GraphQL claros conectados a la base de datos PostgreSQL mediante Prisma.

* **Validaciones y lógica de datos**

  * Usa el tipado estricto de TypeScript y validaciones personalizadas en resolvers.
  * Garantiza integridad de datos y aplica reglas de negocio.

* **Mutations para gestión de archivos y reportes**

  * Permite registrar fotos, actualizar metadatos y vincular datos entre tablas.
  * Todas las mutaciones van validadas y estructuradas.

* **Playground interactivo**

  * Habilitado con Apollo Studio Sandbox (o GraphQL Playground en desarrollo).

# User Experience

* **User personas**

  * Backend Developer: consulta y escribe datos estructurados.
  * QA/Analista: consulta datos en el Playground para pruebas.

* **Key user flows**

  * Consultar metadatos de imagen por ID
  * Asociar archivo a reporte
  * Registrar archivo

# Technical Architecture

* **Stack**:

  * TypeScript
  * Apollo Server
  * Prisma ORM
  * PostgreSQL
  * Docker + Docker Compose

* **Estructura**:

```

├── prisma/                # Esquema y migraciones de Prisma
│   └── schema.prisma
├── src/
│   ├── resolvers/         # Resolvers GraphQL
│   ├── schema/            # Definición del schema GraphQL
│   ├── context.ts         # Inyección de dependencias y Prisma
│   └── index.ts           # Entry point del servidor Apollo
├── .env                   # Variables de entorno
├── Dockerfile             # Imagen del servicio
├── docker-compose.yml     # Servicios: API + PostgreSQL
├── package.json
└── tsconfig.json
```

# Logical Dependency Chain

1. Definición del esquema Prisma (`schema.prisma`)
2. Generación del cliente Prisma
3. Definición del schema GraphQL
4. Implementación de resolvers
5. Validaciones y control de errores
6. Configuración de servidor Apollo + Docker

# Testing Strategy

* Pruebas unitarias de resolvers
* Validaciones de esquema GraphQL (introspection)
* Pruebas de integración con base PostgreSQL en Docker

# Deployment Strategy

* Contenerización con Docker
* Orquestación local con `docker-compose`
* Variables en `.env`
* Listo para CI/CD con GitHub Actions

# Future Enhancements

* Autenticación con JWT
* Auditoría de queries/mutations
* Subscripciones para cambios en tiempo real
* Agregaciones por cliente/lugar/usuario

# Appendix

* **Decisiones clave**:

  * Stack moderno y escalable con Prisma y Apollo
  * Todo tipado con TypeScript para mayor robustez
  * Separación clara por dominios: resolvers, esquemas, contexto
