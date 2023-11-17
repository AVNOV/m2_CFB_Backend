import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Game } from './game.entity';

@Entity()
export class Room {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, default: null })
  code: string;

  @OneToMany(() => User, (user) => user.room)
  users: User[];

  @ManyToOne(() => Game, (game) => game.rooms)
  game: Game;
}
