import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { Posts } from '../posts/posts.entity';
import { Profile } from '../profiles/user-profile.entity';
import { Exclude } from 'class-transformer';
import { Notifications } from '../notifications/notifications.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'username', type: 'varchar', length: '40', unique: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: '40', unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  @Exclude()
  password: string;

  @OneToMany(() => Posts, (post) => post.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Posts[];

  @OneToMany(() => Notifications, (notification) => notification.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  notifications: Notifications[];

  @OneToOne(() => Profile, (profile) => profile.tags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  profile: Profile[];

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
