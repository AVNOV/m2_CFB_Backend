import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from 'src/controllers/question.controller';
import { Question } from 'src/entities/question.entity';
import { QuestionService } from 'src/services/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
