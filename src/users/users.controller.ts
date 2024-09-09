import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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

  @Get()
  findAll() {
    return this.usersServices.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersServices.findOne(id);
  // }

  @Post()
  create(@Body() createUserDto: CreateUsersDto) {
    return this.usersServices.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any): any {
    return req['user'];
  }
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersServices.updateOne(id, updateUsersDto);
  }

  @Get(':id')
  deleteOne(@Param('id') id: string) {
    return this.usersServices.deleteOne(id);
  }
}
