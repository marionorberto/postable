import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get('all')
  async findAll() {
    return await this.usersServices.findAll();
  }

  @Get('user/:id')
  async findByPk(@Param('id') id: string) {
    return await this.usersServices.findByPk(id);
  }

  @Post('create/user')
  create(@Body() createUserDto: CreateUsersDto) {
    return this.usersServices.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any): any {
    return req['user'];
  }

  @Put('update/user/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    return await this.usersServices.updateOne(id, updateUsersDto);
  }

  @Delete('delete/user/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.usersServices.deleteOne(id);
  }
}
