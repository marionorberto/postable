import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateFollowerDto {
  @IsEmail()
  @IsString()
  @MaxLength(50)
  @MinLength(12)
  @IsNotEmpty()
  follower: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(8)
  followed: string;
}
