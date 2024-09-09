import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class PostsSections {
  @PrimaryGeneratedColumn('uuid', { name: 'posts_sections_id' })
  postsSectionsId: string;

  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @Column({ name: 'subtitle', type: 'varchar', length: '200' })
  subtitle: string;

  @Column({ name: 'section_order', nullable: true })
  sectionOrder: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
