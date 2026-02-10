/**
 * @file run-seed.ts
 * @brief Entry point for seeding the database with sample Item data.
 * @details Connects to PostgreSQL via AppDataSource, obtains the Item
 * repository, and inserts a fixed set of sample items.
 */

import { AppDataSource } from '../data-source';
import { Item } from '../entity/item.entity';

/**
 * @brief Sample items to insert into the database.
 * @details Array of plain objects matching Item shape; used to create entities
 * for the repository save. Type: Array<Partial<Item>>.
 */
const sampleItems: Array<Partial<Item>> = [
  {
    name: 'Sample Widget',
    description: 'A sample widget for testing and demonstration.',
    isActive: true,
    quantity: 10,
  },
  {
    name: 'Inactive Item',
    description: 'This item is marked inactive.',
    isActive: false,
    quantity: 0,
  },
  {
    name: 'Minimal Item',
    description: null,
    isActive: true,
    quantity: 1,
  },
];

/**
 * @brief Seeds the database with sample Item records using the TypeORM repository.
 * @details Initialises the DataSource, retrieves the repository for Item,
 * creates Item instances from sample data, and saves them. Logs success or
 * failure and ensures the connection is destroyed on exit.
 * @returns Promise that resolves when seeding is complete or rejects on error.
 */
async function runSeed(): Promise<void> {
  let dataSource: typeof AppDataSource = AppDataSource;

  try {
    await dataSource.initialize();
    const itemRepository = dataSource.getRepository(Item);

    const entities: Item[] = sampleItems.map(
      (data: Partial<Item>): Item => itemRepository.create(data)
    );
    await itemRepository.save(entities);

    console.log(`Seeding complete: ${entities.length} item(s) inserted.`);
  } catch (error: unknown) {
    const err: Error = error instanceof Error ? error : new Error(String(error));
    console.error('Seeding failed:', err.message);
    throw err;
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

runSeed();
