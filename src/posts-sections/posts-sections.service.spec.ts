import { Test, TestingModule } from '@nestjs/testing';
import { PostsSectionsService } from './posts-sections.service';

describe('PostsSectionsService', () => {
  let service: PostsSectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsSectionsService],
    }).compile();

    service = module.get<PostsSectionsService>(PostsSectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
