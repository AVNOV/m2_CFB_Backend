import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnswerDto } from 'src/dto/create-answer.dto';
import { Answer } from 'src/entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswer: CreateAnswerDto) {
    const answer = this.answerRepository.create(createAnswer);

    return this.answerRepository.save(answer);
  }
}
