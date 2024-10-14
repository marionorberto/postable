import {
  Controller,
  Delete,
  Param,
  Post,
  Body,
  Get,
  Put,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsDto } from './dtos/create-notifications.dto';
import { UpdateNotificationsDto } from './dtos/update-notifications.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsServices: NotificationsService) {}

  @Get('all')
  async findAll() {
    return await this.notificationsServices.findAll();
  }

  @Get('notifications/:id')
  async findByPk(@Param('id') id: string) {
    return await this.notificationsServices.findByPk(id);
  }

  @Post('create/notifications')
  create(@Body() createNotificationsDto: CreateNotificationsDto) {
    return this.notificationsServices.create(createNotificationsDto);
  }

  @Put('update/notifications/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateNotificationsDto: UpdateNotificationsDto,
  ) {
    return await this.notificationsServices.updateOne(
      id,
      updateNotificationsDto,
    );
  }

  @Delete('delete/notifications/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.notificationsServices.deleteOne(id);
  }
}
