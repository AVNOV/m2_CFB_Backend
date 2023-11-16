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
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateAnswerDto } from 'src/dto/create-answer.dto';
import { Answer } from 'src/entities/answer.entity';
import { AnswerService } from 'src/services/answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiForbiddenResponse({
    description: "Vous n'avez pas le droit de faire ça.",
  })
  @ApiAcceptedResponse({
    type: Answer,
    isArray: false,
  })
  @ApiBody({ type: CreateAnswerDto })
  async create(@Body() createAnswer: CreateAnswerDto) {
    try {
      return this.answerService.create(createAnswer);
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
