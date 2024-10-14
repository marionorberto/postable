import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { TagsModule } from './tags/tags.module';
import { ProfileModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from './config/datasource';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FollowersModule } from './followers/followers.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule,
    UsersModule,
    AuthModule,
    PostsModule,
    TagsModule,
    ProfileModule,
    NotificationsModule,
    FollowersModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly datasource: DataSource) {}
}
