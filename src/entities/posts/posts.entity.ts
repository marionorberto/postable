import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostsSections } from '../posts-sections/posts-sections.entity';
import { User } from '../users/user.entity';
import { Tags } from '../tags/tags.entity';
import { PostComments } from '../posts-comments/posts-comments.entity';
import { PostLikes } from '../posts-likes/posts-likes.entity';
import { PostSaved } from '../posts-saved/posts-saved.entity';

@Entity('Posts')
export class Posts {
  @PrimaryGeneratedColumn('uuid', { name: 'post_id' })
  id: string;

  @ManyToOne(() => User, (user) => user.post)
  user: User;

  @Column({ name: 'title', type: 'varchar', unique: true })
  title: string;

  @Column({ name: 'link_poster_file', type: 'text' })
  linkPosterFile: string;

  @ManyToMany(() => Tags, { cascade: true, eager: true })
  @JoinTable()
  tags: Tags[];

  @OneToMany(() => PostsSections, (postSection) => postSection.post, {
    cascade: true,
  })
  sections: PostsSections[];

  @OneToMany(() => PostComments, (comment) => comment.post, {
    cascade: true,
  })
  comments: PostComments[];

  @OneToMany(() => PostLikes, (like) => like.post, { cascade: true })
  postLike: PostLikes[];

  @OneToMany(() => PostSaved, (saved) => saved.post, {
    cascade: true,
  })
  saves: PostSaved[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
