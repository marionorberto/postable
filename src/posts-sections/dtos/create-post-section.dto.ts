import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostsSectionsDto {
  @MaxLength(200)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  subtitle: string;
}
