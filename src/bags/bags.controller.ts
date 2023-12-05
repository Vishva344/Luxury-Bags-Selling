import { Controller } from '@nestjs/common';
import { BagsService } from './bags.service';
// import { CreateBagDto } from './dtos/create-bag.dto';

@Controller('bags')
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  // @Post()
  // async createBags(@Body() casereateBagDto: CreateBagDto): Promise<void> {
  //   return this.bagsService.createBags(casereateBagDto);
  // }
}
