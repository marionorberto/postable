import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

import * as bcryptjs from 'bcryptjs';
import { Posts } from '../posts/posts.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'username', type: 'varchar', length: '40', unique: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: '40', unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  password: string;

  @OneToMany(() => Posts, (post) => post.userId, { cascade: true })
  post: Posts[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcryptjs.genSalt(10);
      this.password = await bcryptjs.hash(this.password, salt);
    }
  }
}
