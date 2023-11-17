import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from 'src/controllers/quiz.controller';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizService } from 'src/services/quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  exports: [QuizService],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
