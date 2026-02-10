/**
 * @file item.entity.ts
 * @brief TypeORM entity for the Item table.
 * @details Defines the schema and column mapping for items stored in PostgreSQL.
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * @class Item
 * @brief TypeORM entity mapping to the item table.
 * @details Represents a single item in the system. Each item has a unique
 * identifier, name, optional description, active flag, quantity, and timestamps.
 * Maps to the database table named "item".
 */
@Entity('item')
export class Item {
  /**
   * @brief Primary key; auto-generated UUID.
   * @details TypeORM generates this value on insert. Type: string (UUID v4).
   */
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /**
   * @brief Display name of the item.
   * @details Required; maximum 255 characters. Type: string.
   */
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  /**
   * @brief Optional longer description of the item.
   * @details Nullable; stored as text. Type: string | null.
   */
  @Column({ type: 'text', nullable: true })
  description!: string | null;

  /**
   * @brief Whether the item is considered active.
   * @details Defaults to true. Type: boolean.
   */
  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  /**
   * @brief Quantity in stock; added in migration AddQuantityToItem.
   * @details Non-negative integer; defaults to 0. Type: number.
   */
  @Column({ type: 'int', default: 0 })
  quantity!: number;

  /**
   * @brief Timestamp when the row was created.
   * @details Set automatically by TypeORM on insert. Type: Date.
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  /**
   * @brief Timestamp when the row was last updated.
   * @details Set automatically by TypeORM on update. Type: Date.
   */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
