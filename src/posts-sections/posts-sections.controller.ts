import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreatePostsSectionsDto } from './dtos/create-post-section.dto';
import { UpdatePostsSectionsDto } from './dtos/update-post-section.dto';
import { PostsSectionsService } from './posts-sections.service';

@Controller('posts')
export class PostsSectionsController {
  constructor(private postsSectionsService: PostsSectionsService) {}
  @Get()
  findAll(): CreatePostsSectionsDto[] | null {
    return this.postsSectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsSectionsService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostsSectionsDto) {
    return createPostDto;
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updatePostsSectionsDto: UpdatePostsSectionsDto,
  ) {
    return this.postsSectionsService.updateOne(id, updatePostsSectionsDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.postsSectionsService.deleteOne(id);
  }
}
