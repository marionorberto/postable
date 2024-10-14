import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dtos/create-follower.dto';
import { UpdateFollowerDto } from './dtos/update-follower.dto';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Get('all')
  async findAll() {
    return await this.followersService.findAll();
  }

  @Get('follower/:id')
  async findByPk(@Param('id') id: string) {
    return await this.followersService.findByPk(id);
  }

  @Post('create/follower')
  create(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followersService.create(createFollowerDto);
  }

  @Put('update/follower/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateFollowerDto: UpdateFollowerDto,
  ) {
    return await this.followersService.updateOne(id, updateFollowerDto);
  }

  @Delete('delete/follower/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.followersService.deleteOne(id);
  }
}
