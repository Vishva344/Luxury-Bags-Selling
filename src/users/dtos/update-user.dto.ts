/**
 * @ignore
 */
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * @ignore
 */
export class UpdateUserDto extends PickType(CreateUserDto, ['name', 'phoneNumber', 'email'] as const) {}
