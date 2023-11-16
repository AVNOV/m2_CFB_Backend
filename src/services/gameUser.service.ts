import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameUser } from 'src/entities/game_user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameUserService {
  constructor(
    @InjectRepository(GameUser)
    private gameUserRepository: Repository<GameUser>,
  ) {}

  async create(gameId: number, userId: number): Promise<GameUser> {
    const gameUser = this.gameUserRepository.create({
      game: { id: gameId },
      user: { id: userId },
      nbAnswers: 0,
      nbCorrectAnswers: 0,
    });
    return this.gameUserRepository.save(gameUser);
  }

  async update(
    gameId: number,
    userId: number,
    nbAnswers: number,
    nbCorrectAnswers: number,
  ): Promise<GameUser | HttpException> {
    const gameUser = await this.gameUserRepository.findOneBy({
      game: { id: gameId },
      user: { id: userId },
    });

    if (!gameUser)
      return new HttpException(
        "La partie que vous essayez de modifier n'existe pas.",
        HttpStatus.BAD_REQUEST,
      );

    gameUser.nbAnswers = nbAnswers;
    gameUser.nbCorrectAnswers = nbCorrectAnswers;

    return this.gameUserRepository.save(gameUser);
  }
}
