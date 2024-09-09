import { Injectable } from '@nestjs/common';
import { UpdatePostsContentsDto } from './dtos/update-post-contents.dto';
import { CreatePostsContentsDto } from './dtos/create-post-contents.dto';

@Injectable()
export class PostsContentsService {
  posts: CreatePostsContentsDto[];

  constructor() {}
  findAll(): CreatePostsContentsDto[] | null {
    if (this.posts.length <= 0) return null;

    return this.posts;
  }

  findOne(id: string) {
    return id;
  }

  create(createPostDto: CreatePostsContentsDto) {
    return createPostDto;
  }

  updateOne(id: string, updatePostDto: UpdatePostsContentsDto) {
    return updatePostDto;
  }

  deleteOne(id: string) {
    return id;
  }
}
