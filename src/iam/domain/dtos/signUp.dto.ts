import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  nationalId: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  phoneNumber: string;
}
