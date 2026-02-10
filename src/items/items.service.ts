/**
 * @file items.service.ts
 * @brief Service layer for Item CRUD operations using TypeORM repository.
 * @details Injects Repository<Item> and exposes find all and find one by id.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entity/item.entity';

/**
 * @class ItemsService
 * @brief Service that performs Item read operations via the TypeORM repository.
 * @details Provides methods to read items from the database using the TypeORM
 * repository. Injected with Repository<Item>.
 */
@Injectable()
export class ItemsService {
  /**
   * @brief Injected TypeORM repository for the Item entity.
   * @details Used for all database operations on the item table. Type: Repository<Item>.
   */
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  /**
   * @brief Returns all items from the database.
   * @details Delegates to the repository find() with no criteria.
   * @returns Promise resolving to an array of Item entities.
   */
  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  /**
   * @brief Returns a single item by its primary key, or undefined if not found.
   * @details Delegates to the repository findOne with where id equals the given id.
   * @param[in] id - UUID string of the item.
   * @returns Promise resolving to Item or undefined.
   */
  async findOne(id: string): Promise<Item | undefined> {
    const item: Item | null = await this.itemRepository.findOne({
      where: { id },
    });
    return item ?? undefined;
  }
}
