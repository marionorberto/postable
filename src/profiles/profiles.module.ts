import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from 'src/entities/profiles/user-profile.entity';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/entities/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { TagsModule } from 'src/tags/tags.module';
import { TagsService } from 'src/tags/tags.service';
import { Tags } from 'src/entities/tags/tags.entity';
import { Followers } from 'src/entities/followers/followers.entity';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Profile, User, Tags, Followers]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UsersService, TagsService],
  exports: [ProfileService, UsersService, TagsService],
})
export class ProfileModule {}
