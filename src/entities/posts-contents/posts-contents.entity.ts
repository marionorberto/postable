import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostsSections } from '../posts-sections/posts-sections.entity';

@Entity()
export class PostsContents {
  @PrimaryGeneratedColumn('uuid', { name: 'post_section_id' })
  postsContentsId: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @ManyToOne(() => PostsSections, (postSection) => postSection.contents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sections: PostsSections[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
