import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profiles/user-profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async findAll() {
    try {
      const allTags = await this.profilesRepository.find();

      return {
        statusCode: 200,
        method: 'GET',
        message: 'profiles fetched sucessfully.',
        data: allTags,
        path: '/profiles',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(`Failed to fetch profiles | Error Message: ${error.message}`);
      throw new HttpException(
        {
          statusCode: 400,
          method: 'GET',
          message: 'Failure to fetch profiles.',
          path: '/profiles',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createProfileDto: CreateProfileDto) {
    try {
      const profileToSave = this.profilesRepository.create(createProfileDto);
      const profileSaved = await this.profilesRepository.save(profileToSave);

      const {
        id,
        userId,
        bio,
        birthday,
        countryName,
        job,
        remoteJob,
        urlImg,
        website,
        yearsWorking,
        tags,
        createdAt,
      } = profileSaved;

      return {
        statusCode: 201,
        method: 'POST',
        message: 'Profile created sucessfully',
        data: {
          id,
          userId,
          bio,
          birthday,
          countryName,
          job,
          remoteJob,
          urlImg,
          website,
          yearsWorking,
          tags,
          createdAt,
        },
        path: '/profiles',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to create new Profile | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'POST',
          message: 'Failed to create new Profile',
          error: error.message,
          path: '/profile',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByPk(id: string) {
    try {
      const profile = await this.profilesRepository.findOneBy({
        id,
      });

      if (!profile)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'GET',
            message: 'Failure to fetch this profile.',
            path: '/profiles',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      return {
        statusCode: 200,
        method: 'GET',
        message: 'Profile fetched sucessfully.',
        data: profile,
        path: '/profile',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to fetch this Profile. | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 404,
          method: 'GET',
          message: 'Failed to fetch this profile.',
          error: error.message,
          path: '/profile',
          timestamp: Date.now(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateOne(id: string, updateTagDto: UpdateProfileDto) {
    try {
      await this.profilesRepository.update(id, updateTagDto);

      const {
        userId,
        birthday,
        countryName,
        bio,
        job,
        remoteJob,
        tags,
        urlImg,
        website,
        yearsWorking,
        createdAt,
        updatedAt,
      } = await this.profilesRepository.findOneBy({ id });

      return {
        statusCode: 200,
        method: 'PUT',
        message: 'Profile updated sucessfully',
        data: {
          id,
          userId,
          birthday,
          countryName,
          bio,
          job,
          remoteJob,
          tags,
          urlImg,
          website,
          yearsWorking,
          createdAt,
          updatedAt,
        },
        path: '/profiles',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to update new Profile | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'PUT',
          message: 'Failed to update Profile',
          error: error.message,
          path: '/profiles',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const tagToDelete = await this.profilesRepository.findOneBy({ id });
      if (!tagToDelete)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'GET',
            message: 'Profile Not Found',
            path: '/profiles',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      await this.profilesRepository.remove(tagToDelete);

      return {
        statusCode: 200,
        method: 'DELETE',
        message: 'Profile deleted sucessfully',
        path: '/profiles',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(`Failed to delete Profile | Error Message: ${error.message}`);

      throw new HttpException(
        {
          statusCode: 400,
          method: 'DELETE',
          message: 'Failed to delete Profile',
          error: error.message,
          path: '/profiles',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
