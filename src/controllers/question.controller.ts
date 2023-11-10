import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from 'src/dto/create-question.dto';
import { Question } from 'src/entities/question.entity';
import { QuestionService } from 'src/services/question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiForbiddenResponse({
    description: "Vous n'avez pas le droit de faire ça.",
  })
  @ApiAcceptedResponse({
    type: Question,
    isArray: false,
  })
  @ApiBody({ type: CreateQuestionDto })
  async create(@Body() createQuestion: CreateQuestionDto) {
    try {
      return this.questionService.create(createQuestion);
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
