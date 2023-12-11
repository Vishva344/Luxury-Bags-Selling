import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from '../typeorm/varient.entity';
import { Bag } from '../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Variant, Bag])],
  controllers: [VariantController],
  providers: [VariantService],
})
export class VariantModule {}
