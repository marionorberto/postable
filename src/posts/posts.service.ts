import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  posts: CreatePostDto[];

  constructor() {}
  findAll(): CreatePostDto[] | null {
    if (this.posts.length <= 0) return null;

    return this.posts;
  }

  findOne(id: string) {
    return id;
  }

  create(createPostDto: CreatePostDto) {
    return createPostDto;
  }

  updateOne(id: string, updatePostDto: UpdatePostDto) {
    return updatePostDto;
  }

  deleteOne(id: string) {
    return id;
  }
}
