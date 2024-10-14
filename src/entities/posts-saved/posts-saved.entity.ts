import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
} from 'typeorm';

@Entity({ name: 'posts-saved' })
export class PostSaved {
  @PrimaryGeneratedColumn('uuid', { name: 'post-saved-id' })
  postLikeId: string;

  @Column({ name: 'user-id', type: 'varchar' })
  userId: string;

  @Column({ name: 'post-id', type: 'varchar' })
  postId: string;

  @CreateDateColumn({ name: 'created-at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated-at', type: 'timestamp' })
  updateAt: Date;
}
