import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Followers } from 'src/entities/followers/followers.entity';
import { CreateFollowerDto } from './dtos/create-follower.dto';
import { UpdateFollowerDto } from './dtos/update-follower.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Followers)
    private readonly followerRepository: Repository<Followers>,
  ) {}

  async findAll() {
    try {
      const allFollowers = await this.followerRepository.find();

      return {
        statusCode: 200,
        method: 'GET',
        message: 'Follower fetched sucessfully.',
        data: allFollowers,
        path: '/follower',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to fetch followers | Error Message: ${error.message}`,
      );
      throw new HttpException(
        {
          statusCode: 400,
          method: 'GET',
          message: 'Failure to fetch followers.',
          path: '/followers',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByPk(id: string) {
    try {
      const follower = await this.followerRepository.findOneBy({ id });

      if (!follower)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'GET',
            message: 'Failure to fetch this follower.',
            path: '/followers',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      return {
        statusCode: 200,
        method: 'GET',
        message: 'follower fetched sucessfully.',
        data: follower,
        path: '/followers',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to fetch this follower. | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 404,
          method: 'GET',
          message: 'Failed to fetch this follower.',
          error: error.message,
          path: '/followers',
          timestamp: Date.now(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(createFollowerDto: CreateFollowerDto) {
    try {
      const followerToSave = this.followerRepository.create(createFollowerDto);

      const followerSaved = await this.followerRepository.save(followerToSave);

      const { id, follower, followed } = followerSaved;

      return {
        statusCode: 201,
        method: 'POST',
        message: 'Follower created sucessfully',
        data: {
          id,
          follower,
          followed,
        },
        path: '/followers',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to create new Follower | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'POST',
          message: 'Failed to create new Follower',
          error: error.message,
          path: '/followers',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateOne(id: string, updateFollowerDto: UpdateFollowerDto) {
    try {
      await this.followerRepository.update(id, updateFollowerDto);

      const { follower, followed, createdAt, updatedAt } =
        await this.followerRepository.findOneBy({
          id,
        });

      return {
        statusCode: 200,
        method: 'PUT',
        message: 'Follower updated sucessfully',
        data: {
          follower,
          followed,
          createdAt,
          updatedAt,
        },
        path: '/followers',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to update new Follower | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'PUT',
          message: 'Failed to update Follower',
          error: error.message,
          path: '/followers',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const followerToDelete = await this.followerRepository.findOneBy({ id });
      if (!followerToDelete)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'GET',
            message: 'Follower Not Found',
            path: '/followers',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      await this.followerRepository.remove(followerToDelete);

      return {
        statusCode: 200,
        method: 'DELETE',
        message: 'Follower deleted sucessfully',
        path: '/followers',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to delete Follower | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'DELETE',
          message: 'Failed to delete Follower',
          error: error.message,
          path: '/followers',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
