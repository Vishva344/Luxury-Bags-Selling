import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { JwtService } from '@nestjs/jwt';
import { Bag } from '../bags/entities/bags.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variant, Bag, User])],
  controllers: [VariantController],
  providers: [VariantService, JwtService],
})
export class VariantModule {}
