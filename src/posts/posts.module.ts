import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts/posts.entity';
import { PostsContents } from 'src/entities/posts-contents/posts-contents.entity';
import { PostsSections } from 'src/entities/posts-sections/posts-sections.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, PostsSections, PostsContents])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
