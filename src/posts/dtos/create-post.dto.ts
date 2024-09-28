import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreatePostSectionDto } from './create-post-section.dto';
import { createTagDto } from 'src/tags/dtos/create-tag.dto';

export class CreatePostDto {
  @MaxLength(200)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(50)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  linkPosterFile: string;

  @IsNotEmpty()
  tags: createTagDto[];

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  sections: CreatePostSectionDto[];
}
