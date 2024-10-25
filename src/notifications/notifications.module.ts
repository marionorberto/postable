import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notifications } from 'src/entities/notifications/notifications.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { User } from 'src/entities/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Followers } from 'src/entities/followers/followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications, User, Followers])],
  providers: [NotificationsService, UsersService],
  controllers: [NotificationsController],
  exports: [NotificationsService, UsersService],
})
export class NotificationsModule {}
