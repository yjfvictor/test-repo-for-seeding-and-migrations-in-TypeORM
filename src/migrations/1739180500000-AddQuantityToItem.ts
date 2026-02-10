/**
 * @file 1739180500000-AddQuantityToItem.ts
 * @brief Migration: adds quantity column to the item table.
 * @details This migration adds a non-nullable integer column "quantity" with
 * default 0. The down method removes the column for rollback.
 */

import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @class AddQuantityToItem1739180500000
 * @brief Migration that adds the quantity column to the item table.
 * @details Implements MigrationInterface. Up: add quantity column (integer,
 * default 0). Down: drop quantity column.
 */
export class AddQuantityToItem1739180500000 implements MigrationInterface {
  /**
   * @brief Applies the migration by adding the quantity column.
   * @details Adds "quantity" as integer NOT NULL DEFAULT 0 to the item table.
   * @param[in] queryRunner - TypeORM QueryRunner used to execute SQL.
   * @returns Promise that resolves when the migration has been applied.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "item"
      ADD COLUMN "quantity" integer NOT NULL DEFAULT 0
    `);
  }

  /**
   * @brief Reverts the migration by dropping the quantity column.
   * @details Removes the "quantity" column from the item table.
   * @param[in] queryRunner - TypeORM QueryRunner used to execute SQL.
   * @returns Promise that resolves when the migration has been reverted.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "item"
      DROP COLUMN "quantity"
    `);
  }
}
