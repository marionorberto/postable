import {
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tags } from '../tags/tags.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'UserProfiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid', { name: 'user-profile-id' })
  id: string;

  @Column({ name: 'country_name', type: 'varchar', length: '3' })
  countryName: string;

  @Column({ name: 'birthday', type: 'date' })
  birthday: Date;

  @Column({ name: 'years_working', type: 'int' })
  yearsWorking: number;

  @Column({ name: 'bio', type: 'text' })
  bio: string;

  @Column({ name: 'job', type: 'varchar', length: '40' })
  job: string;

  @Column({ name: 'remote_job', type: 'boolean' })
  remoteJob: boolean;

  @Column({ name: 'url_website', type: 'varchar' })
  urlImg: string;

  @Column({ name: 'url_website', type: 'varchar' })
  website: string;

  @ManyToMany(() => Tags)
  @JoinTable()
  tags: Tags[];

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userId: User[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
