import { Test, TestingModule } from '@nestjs/testing';
import { PostsContentsController } from './posts-contents.controller';

describe('PostsSectionsController', () => {
  let controller: PostsContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsContentsController],
    }).compile();

    controller = module.get<PostsContentsController>(PostsContentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
