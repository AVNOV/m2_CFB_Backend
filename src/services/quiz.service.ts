import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from 'src/dto/create-quiz.dto';
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

  async create(createQuiz: CreateQuizDto, userId: number) {
    const quiz = this.quizRepository.create({
      ...createQuiz,
      user: { id: userId },
    });

    return this.quizRepository.save(quiz);
  }

  async update(quizId, updateQuiz: CreateQuizDto) {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

    if (!quiz)
      return new HttpException(
        "Le quiz que vous essayez de modifier n'existe pas.",
        HttpStatus.BAD_REQUEST,
      );

    quiz.title = updateQuiz.title || quiz.title;
    quiz.difficulty = updateQuiz.difficulty || quiz.difficulty;
    quiz.themeId = updateQuiz.themeId || quiz.themeId;

    return this.quizRepository.save(quiz);
  }

  async findByUserId(userId: number) {
    return this.quizRepository.find({
      where: { user: { id: userId } },
      relations: {
        theme: true,
        questions: { answers: true },
        games: true,
      },
    });
  }
}
