import { Controller } from '@nestjs/common';
import { VarientService } from './varient.service';

@Controller('varient')
export class VarientController {
  constructor(private readonly varientService: VarientService) {}
}
