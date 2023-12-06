import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * @ignore
 */
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  password: string;
}
