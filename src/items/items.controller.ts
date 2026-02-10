/**
 * @file items.controller.ts
 * @brief REST controller for Item resources.
 * @details Exposes GET /items and GET /items/:id.
 */

import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../entity/item.entity';

/**
 * @class ItemsController
 * @brief REST controller that exposes Item endpoints.
 * @details Handles HTTP requests for the Item resource. Provides GET /items
 * (list all) and GET /items/:id (find by UUID).
 */
@Controller('items')
export class ItemsController {
  /**
   * @brief Injected service that performs Item database operations.
   * @details Type: ItemsService.
   */
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * @brief Returns all items.
   * @details GET /items returns the list of items from the database.
   * @returns Promise resolving to an array of Item.
   */
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  /**
   * @brief Returns one item by id.
   * @details GET /items/:id returns a single item or 404 if not found.
   * @param[in] id - UUID of the item from the URL.
   * @returns Promise resolving to the Item.
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    const item: Item | undefined = await this.itemsService.findOne(id);
    if (item === undefined) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }
}
