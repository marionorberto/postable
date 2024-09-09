import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostsSectionsModule } from './posts-sections/posts-section.module';
import { PostsContentsModule } from './posts-contents/posts-contents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { DataSource } from 'typeorm';
import { User } from './entities/user/user';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'marionorberto',
      password: 'cavera?@mau',
      database: 'postable',
      autoLoadEntities: true,
      synchronize: true, // 💡 cannot be used on production
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 3,
      },
    ]),
    AuthModule,
    PostsModule,
    PostsSectionsModule,
    PostsContentsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly datasource: DataSource) {}
}
