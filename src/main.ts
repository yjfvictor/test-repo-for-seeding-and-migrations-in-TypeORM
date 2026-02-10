/**
 * @file main.ts
 * @brief Bootstrap entry point for the NestJS application.
 * @details Loads environment variables and starts the NestJS application.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/** Load .env before bootstrapping. */
require('dotenv').config();

/**
 * @brief Bootstraps and runs the NestJS application.
 * @details Creates the Nest application from AppModule and listens on port 3000.
 * @returns Promise that resolves when the application is listening.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
