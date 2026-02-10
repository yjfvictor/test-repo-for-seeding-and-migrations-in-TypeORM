/**
 * @file data-source.ts
 * @brief DataSource configuration for TypeORM CLI (migrations, seeding).
 * @details This file is used by the TypeORM CLI to run migrations and by the
 * seed script to obtain a connection. It loads environment variables from .env
 * and exports a DataSource instance configured for PostgreSQL.
 */

import { DataSource } from 'typeorm';
import * as path from 'path';

/** Load environment variables from .env file when running under Node. */
require('dotenv').config();

/**
 * @brief Hostname or IP of the PostgreSQL server.
 * @details Read from process.env.DB_HOST; defaults to 'localhost'.
 */
const dbHost: string = process.env.DB_HOST ?? 'localhost';

/**
 * @brief TCP port number of the PostgreSQL server.
 * @details Read from process.env.DB_PORT; defaults to '5432'.
 */
const dbPort: number = parseInt(process.env.DB_PORT ?? '5432', 10);

/**
 * @brief PostgreSQL role (username) for authentication.
 * @details Read from process.env.DB_USERNAME; defaults to 'postgres'.
 */
const dbUsername: string = process.env.DB_USERNAME ?? 'postgres';

/**
 * @brief PostgreSQL password for the given username.
 * @details Read from process.env.DB_PASSWORD; defaults to 'postgres'.
 */
const dbPassword: string = process.env.DB_PASSWORD ?? 'postgres';

/**
 * @brief Name of the PostgreSQL database to connect to.
 * @details Read from process.env.DB_DATABASE; defaults to 'typeorm_migrations_db'.
 */
const dbDatabase: string = process.env.DB_DATABASE ?? 'typeorm_migrations_db';

/**
 * @brief Absolute path to the directory containing migration files.
 * @details Resolved relative to this file so that CLI and seed script work from any cwd.
 */
const migrationsDir: string = path.join(__dirname, 'migrations');

/**
 * @brief TypeORM DataSource used by the CLI and seed script.
 * @details Configures a PostgreSQL driver, entity and migration paths, and disables
 * synchronize so that schema changes are applied only via migrations.
 */
export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbDatabase,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [
    path.join(__dirname, 'entity', 'item.entity.ts'),
    path.join(__dirname, 'entity', 'item.entity.js'),
  ],
  migrations: [
    path.join(migrationsDir, '*.ts'),
    path.join(migrationsDir, '*.js'),
  ],
  migrationsTableName: 'migrations',
});
