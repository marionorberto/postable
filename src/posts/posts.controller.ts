import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  findAll(): CreatePostDto[] | null {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return createPostDto;
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updateOne(id, updatePostDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.postsService.deleteOne(id);
  }
}
