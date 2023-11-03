import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  async randomOneByThemeId(themeId: number): Promise<Quiz> {
    const quizzes = await this.quizRepository.find({
      where: { themeId },
      relations: {
        theme: true,
        questions: { answers: true },
        user: true,
        games: true,
      },
    });

    return quizzes[Math.floor(Math.random() * quizzes.length)];
  }
}
