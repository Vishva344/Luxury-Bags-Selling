import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
