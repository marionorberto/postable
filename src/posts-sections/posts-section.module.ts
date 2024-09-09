import { Module } from '@nestjs/common';
import { PostsSectionsService } from './posts-sections.service';
import { PostsSectionsController } from './posts-sections.controller';

@Module({
  providers: [PostsSectionsService],
  controllers: [PostsSectionsController],
})
export class PostsSectionsModule {}
