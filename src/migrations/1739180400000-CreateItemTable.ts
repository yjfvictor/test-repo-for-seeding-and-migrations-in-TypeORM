/**
 * @file 1739180400000-CreateItemTable.ts
 * @brief Initial migration: creates the item table.
 * @details This migration creates the "item" table with columns id (UUID),
 * name, description, isActive, created_at, and updated_at. The down method
 * drops the table for rollback.
 */

import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @class CreateItemTable1739180400000
 * @brief Migration that creates the item table.
 * @details Implements MigrationInterface. Up: create item table with id, name,
 * description, isActive, created_at, updated_at. Down: drop item table.
 */
export class CreateItemTable1739180400000 implements MigrationInterface {
  /**
   * @brief Applies the migration by creating the item table.
   * @details Creates the "item" table with UUID primary key, varchar name,
   * nullable text description, boolean isActive with default true, and
   * created_at/updated_at timestamps.
   * @param[in] queryRunner - TypeORM QueryRunner used to execute SQL.
   * @returns Promise that resolves when the migration has been applied.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "item" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(255) NOT NULL,
        "description" text,
        "isActive" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_item" PRIMARY KEY ("id")
      )
    `);
  }

  /**
   * @brief Reverts the migration by dropping the item table.
   * @details Drops the "item" table. Used when running migration:revert.
   * @param[in] queryRunner - TypeORM QueryRunner used to execute SQL.
   * @returns Promise that resolves when the migration has been reverted.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "item"`);
  }
}
