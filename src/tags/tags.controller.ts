import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('all')
  async fillAll() {
    return await this.tagsService.findAll();
  }

  @Get('post/:id')
  async findByPk(@Param('id') id: string) {
    return await this.tagsService.findByPk(id);
  }

  @Post('create/:id')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Put('update/post/:id')
  async updateOne(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.updateOne(id, updateTagDto);
  }

  @Delete('delete/post/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.tagsService.deleteOne(id);
  }
}
