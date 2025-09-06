import { IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(400)
  address: string;
}