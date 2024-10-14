import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { Followers } from 'src/entities/followers/followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Followers])],
  providers: [FollowersService],
  controllers: [FollowersController],
  exports: [FollowersService],
})
export class FollowersModule {}
