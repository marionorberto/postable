import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { CreatePostContentDto } from './create-post-content.dto';

export class CreatePostSectionDto {
  @MaxLength(200)
  @MinLength(20)
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @MaxLength(50)
  @MinLength(20)
  @IsString()
  @IsOptional()
  linkFileSection: string;

  contents: CreatePostContentDto[];
}
