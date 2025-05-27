# Overview

Microservicio `db-graphql-service` para exponer vía GraphQL una base de datos centralizada del sistema de reportes de mantenimiento automatizados. Permite a los demás microservicios acceder y modificar información estructurada como fotos, metadatos, resultados de análisis, y reportes. Su valor está en centralizar el acceso estructurado y validado a los datos, desacoplando la lógica de almacenamiento de los microservicios consumidores.

# Core Features

* **Exposición de datos vía GraphQL**

  * Qué hace: Permite a los microservicios y clientes consultar y modificar datos estructurados.
  * Por qué importa: Establece un contrato formal y flexible para el acceso a datos.
  * Cómo funciona: Usa Strawberry con FastAPI para definir esquemas GraphQL conectados a la base de datos PostgreSQL.

* **Validaciones y lógica de datos**

  * Qué hace: Implementa reglas de negocio al acceder o modificar datos.
  * Por qué importa: Garantiza consistencia e integridad.
  * Cómo funciona: Usa Pydantic, lógica de resolvers en Strawberry, y validaciones antes de escribir o actualizar datos.

* **Mutations para gestión de archivos y reportes**

  * Qué hace: Permite subir fotos (como referencias), actualizar metadatos y generar reportes.
  * Por qué importa: Facilita la integración con flujos de procesamiento e interfaces.
  * Cómo funciona: Mutations que escriben registros en tablas `media`, `report`, `user`, etc.

* **Playground interactivo (GraphiQL)**

  * Qué hace: Permite explorar el API GraphQL y probar queries/mutations.
  * Por qué importa: Acelera el desarrollo e integración.
  * Cómo funciona: Configurado automáticamente desde Strawberry.

# User Experience

* **User personas**

  * Backend Developer: necesita consultar y escribir datos desde otros servicios.
  * QA/Analista: explora los datos disponibles para pruebas o visualización.

* **Key user flows**

  * `Consulta de metadatos de imágenes`:

    1. El servicio llama una query GraphQL pasando ID de imagen.
    2. Se retorna el objeto con metadatos (fecha, ubicación, etc.).

  * `Asociación de foto a reporte`:

    1. Microservicio IA crea un nuevo análisis.
    2. Llama una mutation que actualiza el reporte relacionado con esa imagen.

  * `Carga de imagen (registro)`:

    1. Servicio de almacenamiento guarda archivo físico.
    2. Llama mutation en `db-graphql-service` para registrar metadatos.

* **UI/UX considerations**

  * GraphQL Playground habilitado por defecto para exploración.
  * Documentación auto-generada de esquema GraphQL.

# Technical Architecture

* **System components**:

  * `db-graphql-service`: FastAPI + Strawberry GraphQL + Prisma ORM
  * PostgreSQL como base de datos relacional centralizada
  * Otros microservicios se conectan vía API GraphQL

* **Data models**:

  ```python
  from datetime import datetime
  from typing import Optional, List, Dict
  from pydantic import BaseModel

  class Client(BaseModel):
      id: int
      nombre_cliente: str
      detalles: Optional[str]
      created_at: datetime
      updated_at: datetime

  class Location(BaseModel):
      id: int
      nombre_lugar: str
      direccion: Optional[str]
      detalles: Optional[str]
      created_at: datetime
      updated_at: datetime

  class ServiceType(BaseModel):
      id: int
      nombre_tipo_servicio: str
      descripcion: Optional[str]
      created_at: datetime
      updated_at: datetime

  class File(BaseModel):
      id: int
      nombre_original_archivo: str
      nombre_archivo_almacenado: str
      mime_type: str
      tamano_bytes: int
      ruta_almacenamiento_fisico: str
      cliente_id: int
      lugar_id: int
      tipo_servicio_id: int
      analizado_con_ia: bool
      es_reporte: bool
      periodicidad: str
      nombre_equipo: str
      fecha_realizacion_servicio: Optional[datetime]
      hash_contenido: Optional[str]
      metadatos_adicionales: Optional[Dict]
      subido_por_usuario_id: Optional[str]
      fecha_subida: datetime
      updated_at: datetime

  class Report(BaseModel):
      id: int
      nombre: str
      reporte_url: str
      foto_antes_url: str
      foto_despues_url: str
      termo_antes_url: str
      termo_despues_url: str
      reporte: Dict
      created_at: datetime
      updated_at: datetime
  ```

* **APIs and integrations**:

  * GraphQL con schema definido en Strawberry
  * Prisma como ORM conectado a PostgreSQL

* **Infrastructure requirements**:

  * Base sobre Docker
  * Variables de entorno para conexión a base de datos (`DATABASE_URL`)
  * Posible integración futura con sistema de autenticación
  * Habilitar playground GraphQL en entorno de desarrollo

# Development Roadmap

* **MVP requirements**:

  * Queries para: obtener clientes, lugares, tipos de servicio, archivos, reportes.
  * Mutations para: registrar archivo, crear reporte, actualizar reporte.
  * Configuración de esquema con Strawberry.
  * Documentación GraphQL habilitada.

* **Future enhancements**:

  * Implementación de control de acceso y autenticación (JWT).
  * Auditoría de queries y mutations.
  * Agregaciones estadísticas (por cliente, lugar, etc.).
  * Subscripciones para eventos en tiempo real.

# Logical Dependency Chain

1. Definición del esquema de datos en Prisma
2. Generación del cliente Prisma
3. Definición del esquema GraphQL en Strawberry
4. Implementación de resolvers y mutations
5. Validaciones de negocio (Pydantic)
6. Configuración del Playground y pruebas manuales

# Testing Strategy

* Pruebas unitarias para resolvers de queries y mutations
* Validaciones automáticas de tipos y campos (Pydantic)
* Pruebas de integración usando una base temporal (SQLite o Docker ephemeral)
* Validación de esquema GraphQL mediante introspección

# Roles and Permissions (opcional)

Por ahora no se implementa autenticación, pero se considera futura extensión con JWT.

# Monitoring and Logging (opcional)

* Log de errores y queries fallidas
* Logging de tiempo de ejecución de resolvers
* Middleware para registrar errores críticos

# Deployment Strategy (opcional)

* Dockerfile para contenerización
* Despliegue mediante Docker Compose
* Variables de entorno centralizadas con `.env`
* CI/CD futuro vía GitHub Actions o similar

# Maintenance Plan (opcional)

* Revisión mensual de integridad de datos
* Limpieza de archivos no asociados (huérfanos)
* Backup automático de base de datos
* Actualización de dependencias semanal

# Appendix

* **Technical specifications**:

  * Prisma ORM
  * Strawberry GraphQL
  * FastAPI
  * PostgreSQL
  * Docker
* **Decisiones clave**:

  * Centralización total del acceso a base de datos
  * No se usa autenticación inicial
  * Auditoría como mejora futura
