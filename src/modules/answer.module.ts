import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from 'src/controllers/answer.controller';
import { Answer } from 'src/entities/answer.entity';
import { AnswerService } from 'src/services/answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
