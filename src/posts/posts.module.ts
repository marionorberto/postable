import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts/posts.entity';
import { PostsContents } from 'src/entities/posts-contents/posts-contents.entity';
import { PostsSections } from 'src/entities/posts-sections/posts-sections.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/users/user.entity';
import { Tags } from 'src/entities/tags/tags.entity';
import { TagsService } from 'src/tags/tags.service';
import { PostLikes } from 'src/entities/posts-likes/posts-likes.entity';
import { PostComments } from 'src/entities/posts-comments/posts-comments.entity';
import { PostSaved } from 'src/entities/posts-saved/posts-saved.entity';
import { Followers } from 'src/entities/followers/followers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Posts,
      PostsSections,
      PostsContents,
      User,
      Tags,
      PostLikes,
      PostComments,
      PostSaved,
      Followers,
    ]),
  ],
  providers: [PostsService, UsersService, TagsService],
  controllers: [PostsController],
  exports: [PostsService, UsersService, TagsService],
})
export class PostsModule {}
