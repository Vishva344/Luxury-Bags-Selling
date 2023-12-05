import { Module } from '@nestjs/common';
import { VarientService } from './varient.service';
import { VarientController } from './varient.controller';

@Module({
  controllers: [VarientController],
  providers: [VarientService],
})
export class VarientModule {}
