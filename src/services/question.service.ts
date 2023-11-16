import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from 'src/dto/create-question.dto';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createQuestion: CreateQuestionDto) {
    const question = await this.questionRepository.save({
      title: createQuestion.title,
      quizzes: [{ id: createQuestion.quizId }],
    });

    return this.questionRepository.save(question);
  }
}
