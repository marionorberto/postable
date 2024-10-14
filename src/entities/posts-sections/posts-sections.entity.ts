import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Posts } from '../posts/posts.entity';
import { PostsContents } from '../posts-contents/posts-contents.entity';

@Entity()
export class PostsSections {
  @PrimaryGeneratedColumn('uuid', { name: 'post_section_id' })
  postsSectionsId: string;

  @Column({ name: 'subtitle', type: 'varchar', length: '200' })
  subtitle: string;

  @Column({ name: 'section_order', nullable: true, type: 'int' })
  sectionOrder: number;

  @ManyToOne(() => Posts, (post) => post.sections, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Posts[];

  @Column({ name: 'link_file_section', type: 'text' })
  linkFileSection: string;

  @OneToMany(() => PostsContents, (postContent) => postContent.sections, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contents: PostsContents[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
