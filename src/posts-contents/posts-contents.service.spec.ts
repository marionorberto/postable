import { Test, TestingModule } from '@nestjs/testing';
import { PostsContentsService } from './posts-contents.service';

describe('PostsSectionsService', () => {
  let service: PostsContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsContentsService],
    }).compile();

    service = module.get<PostsContentsService>(PostsContentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
