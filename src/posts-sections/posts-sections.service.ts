import { Injectable } from '@nestjs/common';
import { UpdatePostsSectionsDto } from './dtos/update-post-section.dto';
import { CreatePostsSectionsDto } from './dtos/create-post-section.dto';

@Injectable()
export class PostsSectionsService {
  posts: CreatePostsSectionsDto[];

  constructor() {}
  findAll(): CreatePostsSectionsDto[] | null {
    if (this.posts.length <= 0) return null;

    return this.posts;
  }

  findOne(id: string) {
    return id;
  }

  create(createPostDto: CreatePostsSectionsDto) {
    return createPostDto;
  }

  updateOne(id: string, updatePostDto: UpdatePostsSectionsDto) {
    return updatePostDto;
  }

  deleteOne(id: string) {
    return id;
  }
}
