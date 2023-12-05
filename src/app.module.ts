import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CommonModule } from './common/common.module';
import { BagsModule } from './bags/bags.module';
import { VarientModule } from './varient/varient.module';

@Module({
  imports: [
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
    ConfigModule,
    CommonModule,
    BagsModule,
    VarientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
