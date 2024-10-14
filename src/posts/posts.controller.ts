import {
  Controller,
  Delete,
  Param,
  Post,
  Body,
  Get,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('all')
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get('posts/:id')
  async findByPk(@Param('id') id: string) {
    return await this.postsService.findByPk(id);
  }

  @Post('create/post')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Put('update/post/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updatePostsDto: UpdatePostDto,
  ) {
    return await this.postsService.updateOne(id, updatePostsDto);
  }

  @Delete('delete/post/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.postsService.deleteOne(id);
  }
}
