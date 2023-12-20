import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from '../typeorm/variant.entity';
import { JwtService } from '@nestjs/jwt';
import { Bag } from '../typeorm/bags.entity';
import { User } from '../typeorm/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variant, Bag, User])],
  controllers: [VariantController],
  providers: [VariantService, JwtService],
})
export class VariantModule {}
