import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notifications } from 'src/entities/notifications/notifications.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateNotificationsDto } from './dtos/create-notifications.dto';
import { UpdateNotificationsDto } from './dtos/update-notifications.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationsRepository: Repository<Notifications>,
  ) {}

  async findAll() {
    try {
      const allNotifications = await this.notificationsRepository.find({
        relations: {
          user: true,
        },
      });

      return {
        statusCode: 200,
        method: 'GET',
        message: 'Notifications fetched sucessfully.',
        data: allNotifications,
        path: '/notifications',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to fetch notifications | Error Message: ${error.message}`,
      );
      throw new HttpException(
        {
          statusCode: 400,
          method: 'GET',
          message: 'Failure to fetch notifications.',
          path: '/notifications',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByPk(id: string) {
    try {
      const notification = await this.notificationsRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
        },
      });

      if (!notification)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'GET',
            message: 'Failure to fetch this notification.',
            path: '/notifications',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      return {
        statusCode: 200,
        method: 'GET',
        message: 'Notification fetched sucessfully.',
        data: notification,
        path: '/notifications',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to fetch this notification. | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 404,
          method: 'GET',
          message: 'Failed to fetch this notification.',
          error: error.message,
          path: '/notifications',
          timestamp: Date.now(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(createNotificationsDto: Partial<CreateNotificationsDto>) {
    try {
      const notificationToSave = this.notificationsRepository.create(
        createNotificationsDto,
      );

      const {
        id,
        user,
        title,
        subtitle,
        content,
        read,
        readAt,
        linkAction,
        createdAt,
      } = await this.notificationsRepository.save(notificationToSave);
      return {
        statusCode: 201,
        method: 'POST',
        message: 'Notifications created sucessfully',
        data: {
          id,
          user,
          title,
          subtitle,
          content,
          read,
          readAt,
          linkAction,
          createdAt,
        },
        path: '/notifications',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to create new Notification | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'POST',
          message: 'Failed to create new Notification',
          error: error.message,
          path: '/notifications',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateOne(
    id: string,
    updateNotificationsDto: Partial<UpdateNotificationsDto>,
  ) {
    try {
      await this.notificationsRepository.update(id, updateNotificationsDto);

      const {
        user,
        title,
        subtitle,
        content,
        linkAction,
        read,
        readAt,
        createdAt,
        updatedAt,
      } = await this.notificationsRepository.findOneBy({ id });

      return {
        statusCode: 200,
        method: 'PUT',
        message: 'Notification updated sucessfully',
        data: {
          id,
          user,
          title,
          subtitle,
          content,
          linkAction,
          read,
          readAt,
          createdAt,
          updatedAt,
        },
        path: '/notifications',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to update new Notification | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'PUT',
          message: 'Failed to update Notification',
          error: error.message,
          path: '/notification',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const postToDelete = await this.notificationsRepository.findOneBy({
        id,
      });

      if (!postToDelete)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'GET',
            message: 'Notifications Not Found',
            path: '/notifications',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      await this.notificationsRepository.remove(postToDelete);

      return {
        statusCode: 200,
        method: 'DELETE',
        message: 'Notification deleted sucessfully',
        path: '/notifications',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to delete Notification | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'PUT',
          message: 'Failed to delete Notification',
          error: error.message,
          path: '/notifications',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
