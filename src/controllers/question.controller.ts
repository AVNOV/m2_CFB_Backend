import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
  async create(@Body() createQuestion: { title: string }) {
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
