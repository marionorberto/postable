import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Posts } from 'src/entities/posts/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRespository: Repository<Posts>,
  ) {}

  async findAll() {
    try {
      const allPosts = await this.postRespository.find({
        relations: {
          sections: true,
          tags: true,
          user: true,
        },
      });

      return {
        statusCode: 200,
        method: 'GET',
        message: 'User fetched sucessfully.',
        data: allPosts,
        path: '/users',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(`Failed to fetch posts | Error Message: ${error.message}`);
      throw new HttpException(
        {
          statusCode: 400,
          method: 'GET',
          message: 'Failure to posts posts.',
          path: '/posts',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByPk(id: string) {
    try {
      const post = await this.postRespository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
          sections: true,
          tags: true,
        },
      });

      if (!post)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'GET',
            message: 'Failure to fetch this post.',
            path: '/posts',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      return {
        statusCode: 200,
        method: 'GET',
        message: 'Post fetched sucessfully.',
        data: post,
        path: '/posts',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to fetch this post. | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 404,
          method: 'GET',
          message: 'Failed to fetch this post.',
          error: error.message,
          path: '/posts',
          timestamp: Date.now(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(createPostDto: CreatePostDto) {
    try {
      const userToSave = this.postRespository.create(createPostDto);

      const { id, title, tags, linkPosterFile, sections, createdAt } =
        await this.postRespository.save(userToSave);
      return {
        statusCode: 201,
        method: 'POST',
        message: 'User created sucessfully',
        data: {
          id,
          title,
          tags,
          linkPosterFile,
          sections,
          createdAt,
        },
        path: '/users',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to create new Post | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'POST',
          message: 'Failed to create new POST',
          error: error.message,
          path: '/posts',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateOne(id: string, updatePostsDto: Partial<UpdatePostDto>) {
    try {
      await this.postRespository.update(id, updatePostsDto);

      const {
        user,
        title,
        tags,
        linkPosterFile,
        sections,
        createdAt,
        updatedAt,
      } = await this.postRespository.findOneBy({ id });

      return {
        statusCode: 200,
        method: 'PUT',
        message: 'User updated sucessfully',
        data: {
          id,
          user,
          title,
          tags,
          linkPosterFile,
          sections,
          createdAt,
          updatedAt,
        },
        path: '/posts',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to update new Post | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'PUT',
          message: 'Failed to update Post',
          error: error.message,
          path: '/post',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const postToDelete = await this.postRespository.findOneBy({
        id,
      });

      if (!postToDelete)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'PUT',
            message: 'Post Not Found',
            path: '/posts',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      await this.postRespository.remove(postToDelete);

      return {
        statusCode: 200,
        method: 'DELETE',
        message: 'Post deleted sucessfully',
        path: '/posts',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(`Failed to delete Post | Error Message: ${error.message}`);

      throw new HttpException(
        {
          statusCode: 400,
          method: 'PUT',
          message: 'Failed to delete Post',
          error: error.message,
          path: '/post',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
