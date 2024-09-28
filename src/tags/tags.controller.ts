import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { createTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: createTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagsService.findOne(id);
  }
}
