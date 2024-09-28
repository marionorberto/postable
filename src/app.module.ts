import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from './config/datasource';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { DataSource } from 'typeorm';
import { TagsController } from './tags/tags.controller';
import { TagsModule } from './tags/tags.module';
@Module({
  imports: [TypeOrmModule, UsersModule, AuthModule, PostsModule, TagsModule],
  controllers: [AppController, TagsController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly datasource: DataSource) {}
}
