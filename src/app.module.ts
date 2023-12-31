import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { BagsModule } from './bags/bags.module';
import { VariantModule } from './variant/variant.module';
import { AuthModule } from './auth/auth.module';
import { getEnvFile } from './config/env.config';
import { ConfigModule } from '@nestjs/config';
import { SeedsService } from './seeds/seed.service';
import { User } from './users/entities/user.entity';
import { FavoriteModule } from './favorite/favorite.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { OfferModule } from './offer/offer.module';
import { ImageModule } from './image/image.module';
import { BidModule } from './bid/bid.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule,
    CommonModule,
    BagsModule,
    VariantModule,
    AuthModule,
    FavoriteModule,
    CartModule,
    OrderModule,
    OfferModule,
    ImageModule,
    BidModule,
  ],
  controllers: [],
  providers: [SeedsService],
})
export class AppModule {}
