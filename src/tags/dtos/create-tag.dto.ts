import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class createTagDto {
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  description: string;
}
