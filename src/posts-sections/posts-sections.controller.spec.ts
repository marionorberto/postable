import { Test, TestingModule } from '@nestjs/testing';
import { PostsSectionsController } from './posts-sections.controller';

describe('PostsSectionsController', () => {
  let controller: PostsSectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsSectionsController],
    }).compile();

    controller = module.get<PostsSectionsController>(PostsSectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
