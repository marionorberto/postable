import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('notifications')
export class Notifications {
  @PrimaryGeneratedColumn('uuid', { name: 'notification_id' })
  id: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'subtitle', type: 'varchar', nullable: true })
  subtitle: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'read', type: 'boolean', default: false })
  read: boolean;

  @Column({ name: 'read_at', type: 'datetime' })
  readAt: Date;

  @Column({ name: 'link_action', type: 'varchar' })
  linkAction: string;

  @ManyToOne(() => User, (users) => users.notifications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
