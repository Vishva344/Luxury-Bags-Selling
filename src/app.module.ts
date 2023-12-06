import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CommonModule } from './common/common.module';
import { BagsModule } from './bags/bags.module';
import { VariantModule } from './variant/variant.module';
import { AuthModule } from './auth/auth.module';
import { getEnvFile } from './config/env.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFile(),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2001',
      database: 'bagSell',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    CommonModule,
    BagsModule,
    VariantModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
