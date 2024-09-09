import { Module } from '@nestjs/common';
import { PostsContentsService } from './posts-contents.service';
import { PostsContentsController } from './posts-contents.controller';

@Module({
  providers: [PostsContentsService],
  controllers: [PostsContentsController],
})
export class PostsContentsModule {}
