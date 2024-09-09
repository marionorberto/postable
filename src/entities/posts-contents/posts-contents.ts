import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class PostsContents {
  @PrimaryGeneratedColumn('uuid', { name: 'posts_sections_id' })
  postsContentsId: string;

  @Column({ name: 'section_id', type: 'uuid' })
  sectionId: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
