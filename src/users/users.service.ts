import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(data: any): Promise<User> {
    const user = await this.userRepository.findOne(data);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(createUsersDto: CreateUsersDto) {
    const newUser = this.userRepository.create(createUsersDto);
    return await this.userRepository.save(newUser);
  }

  updateOne(id: string, updateUsersDto: UpdateUsersDto) {
    return { id, ...updateUsersDto };
  }

  deleteOne(id: string) {
    return id;
  }
}
