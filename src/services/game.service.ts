import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async create(quizId: number): Promise<Game> {
    const game = this.gameRepository.create({ quiz: { id: quizId } });
    return this.gameRepository.save(game);
  }

  async findOne(id: number, userId: number): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: [
        'quiz',
        'gameUser',
        'quiz.questions',
        'quiz.questions.answers',
      ],
    });

    if (!game)
      throw new HttpException("La partie n'existe pas", HttpStatus.BAD_REQUEST);

    const userIds = game.gameUser.map((gameUser) => gameUser.userId);
    if (!userIds.includes(userId))
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return game;
  }
}
