import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from 'src/entities/tags/tags.entity';
import { Repository } from 'typeorm';
import { createTagDto } from './dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  async create(createTagDto: createTagDto) {
    const user = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(user);
  }

  async findOne(id: string) {
    const tag = await this.tagsRepository.find({
      where: {
        id,
      },
    });
    if (tag.length <= 0)
      throw new HttpException('Tags Not Found', HttpStatus.NOT_FOUND);

    return tag;
  }
}
