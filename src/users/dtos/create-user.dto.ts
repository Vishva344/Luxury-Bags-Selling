import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../common/types/common.type';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  role: Role;

  @IsString()
  @IsNotEmpty()
  IsDeactivate: boolean;

  @IsString()
  @IsNotEmpty()
  location: string;
}
