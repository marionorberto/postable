import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePostsSectionsDto {
  @MaxLength(200)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  subtitle: string;
}
