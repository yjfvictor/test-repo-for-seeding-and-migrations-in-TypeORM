/**
 * @file app.module.ts
 * @brief Root application module for the NestJS application.
 * @details Registers TypeORM with the Item entity and the ItemsModule.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entity/item.entity';
import { ItemsModule } from './items/items.module';

/**
 * @brief Database connection options derived from environment.
 * @details Used to configure TypeOrmModule.forRoot. Type: object.
 */
const typeOrmOptions: object = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'typeorm_migrations_db',
  entities: [Item],
  synchronize: false,
};

/**
 * @class AppModule
 * @brief Root application module for the NestJS application.
 * @details Imports TypeOrmModule.forRoot (PostgreSQL) and ItemsModule. All
 * application modules and providers are registered here or in imported modules.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    ItemsModule,
  ],
})
export class AppModule {}
