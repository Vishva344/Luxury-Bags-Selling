import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedsService } from './seeds/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seedService = app.get(SeedsService);
  await seedService.seedAdmin();

  await app.listen(3000);
}
bootstrap();
