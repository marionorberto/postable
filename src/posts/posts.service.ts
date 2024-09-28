import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Posts } from 'src/entities/posts/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  posts: CreatePostDto[];

  constructor(
    @InjectRepository(Posts)
    private readonly postRespository: Repository<Posts>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const user = this.postRespository.create(createPostDto);

    const { userId, title, tags, linkPosterFile, sections, createdAt } =
      await this.postRespository.save(user);
    return {
      userId,
      title,
      tags,
      createdAt,
      linkPosterFile,
      sections,
    };
  }

  async findOne(id: string) {
    const post = await this.postRespository.find({
      where: {
        id,
      },
      relations: {
        user: true,
        sections: true,
        tags: true,
      },
    });

    if (post.length <= 0)
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);

    return post;
  }
}
