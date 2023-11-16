import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { User } from './user.entity';
import { Theme } from './theme.entity';
import { Game } from './game.entity';

@Entity()
export class Quiz {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  difficulty: number;

  @ApiProperty()
  @Column({ name: 'theme_id' })
  themeId: number;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({ name: 'deleted_at' })
  @Column({
    type: 'timestamp',
    default: null,
    name: 'deleted_at',
  })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.quizzes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Question, (question) => question.quizzes)
  @JoinTable({ name: 'quiz_questions' })
  questions: Question[];

  @ManyToOne(() => Theme, (theme) => theme.quizzes)
  @JoinColumn({ name: 'theme_id' })
  theme: Theme;

  @OneToMany(() => Game, (game) => game.quiz)
  games: Game[];
}
