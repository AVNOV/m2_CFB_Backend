import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Game } from './game.entity';

@Entity()
export class GameUser {
  @Column({ name: 'nb_correct_answers' })
  nbCorrectAnswers: number;

  @Column({ name: 'nb_answers' })
  nbAnswers: number;

  @PrimaryColumn({ name: 'game_id' })
  gameId: number;

  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.gameUser)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Game, (game) => game.gameUser)
  @JoinColumn({ name: 'game_id' })
  game: Game;
}
