import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/entities/users/user.entity';

export class CreateNotificationsDto {
  @MaxLength(300)
  @MinLength(30)
  @IsString()
  @IsEmpty()
  title: string;

  @MaxLength(300)
  @MinLength(30)
  @IsString()
  @IsEmpty()
  subtitle: string;

  @MaxLength(300)
  @MinLength(30)
  @IsString()
  @IsEmpty()
  content: string;

  @IsBoolean()
  @IsEmpty()
  read: boolean;

  @IsDate()
  @IsEmpty()
  readAt: Date;

  @MaxLength(60)
  @IsString()
  @IsEmpty()
  linkAction: string;

  user: User[];
}
