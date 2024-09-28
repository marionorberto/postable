import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';

import { DataSource, Repository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';
@Injectable()
export class UsersService {
  private userRepository: Repository<User>;
  constructor(private readonly datasource: DataSource) {
    this.userRepository = this.datasource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(data: any): Promise<User> {
    const user = await this.userRepository.findOne(data);
    if (!user) throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findByPk(id: string) {
    const user = await this.userRepository.find({
      where: {
        id,
      },
    });

    if (user.length <= 0)
      throw new HttpException('*User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(createUsersDto: CreateUsersDto) {
    const newUser = this.userRepository.create(createUsersDto);
    return await this.userRepository.save(newUser);
  }

  updateOne(id: string, updateUsersDto: UpdateUsersDto) {
    return { id, ...updateUsersDto };
  }

  async deleteOne(id: string) {
    const user = await this.userRepository.find({
      where: {
        id,
      },
    });

    if (user.length <= 0)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const userDeleted = await this.userRepository.remove(user);

    if (userDeleted.length >= 0) {
      return new HttpException(
        'user deleted sucessfully',
        HttpStatus.NO_CONTENT,
      );
    }
  }
}
