/**
 * @file items.module.ts
 * @brief NestJS module that provides Item entity and ItemsService.
 * @details Registers TypeOrmModule.forFeature([Item]) and exports ItemsService.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entity/item.entity';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

/**
 * @class ItemsModule
 * @brief NestJS feature module for the Item resource.
 * @details Registers TypeOrmModule.forFeature([Item]), declares ItemsController
 * and ItemsService, and exports ItemsService for use in other modules.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
