import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreatePostsContentsDto } from './dtos/create-post-contents.dto';
import { UpdatePostsContentsDto } from './dtos/update-post-contents.dto';
import { PostsContentsService } from './posts-contents.service';

@Controller('posts')
export class PostsContentsController {
  constructor(private postsSectionsService: PostsContentsService) {}
  @Get()
  findAll(): CreatePostsContentsDto[] | null {
    return this.postsSectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsSectionsService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostsContentsDto) {
    return createPostDto;
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updatePostsContentsDto: UpdatePostsContentsDto,
  ) {
    return this.postsSectionsService.updateOne(id, updatePostsContentsDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.postsSectionsService.deleteOne(id);
  }
}
