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
import { User } from '../user/user.entity';
import { Tags } from '../tags/tags.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn('uuid', { name: 'post_id' })
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.post)
  user: User[];

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'link_poster_file', type: 'text' })
  linkPosterFile: string;

  @ManyToMany(() => Tags)
  @JoinTable()
  tags: Tags[];

  @OneToMany(() => PostsSections, (postSection) => postSection.post, {
    cascade: true,
  })
  sections: PostsSections[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
