import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Posts } from '../posts/posts.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'posts-likes' })
export class PostLikes {
  @PrimaryGeneratedColumn('uuid', { name: 'post-like-id' })
  postLikeId: string;

  @ManyToOne(() => Posts, (posts) => posts.user)
  post: Posts[];

  @ManyToOne(() => User, (user) => user.post)
  user: User[];

  @CreateDateColumn({ name: 'created-at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated-at', type: 'timestamp' })
  updateAt: Date;
}
