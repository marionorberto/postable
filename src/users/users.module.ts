import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { Followers } from 'src/entities/followers/followers.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Followers])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
