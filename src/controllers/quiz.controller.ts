import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuizDto } from 'src/dto/create-quiz.dto';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizService } from 'src/services/quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiForbiddenResponse({
    description: "Vous n'avez pas le droit de faire ça.",
  })
  @ApiAcceptedResponse({
    type: Quiz,
    isArray: false,
  })
  async create(@Body() createQuiz: CreateQuizDto, @Request() req: any) {
    try {
      return this.quizService.create(createQuiz, req.user.id);
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/:id')
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiForbiddenResponse({
    description: "Vous n'avez pas le droit de faire ça.",
  })
  @ApiAcceptedResponse({
    type: Quiz,
    isArray: false,
  })
  async update(@Param('id') id: string, @Body() updateQuiz: CreateQuizDto) {
    try {
      return this.quizService.update(id, updateQuiz);
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiAcceptedResponse({
    type: Quiz,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiForbiddenResponse({
    description: "Vous n'avez pas le droit de faire ça.",
  })
  @Get(':id/random')
  async randomOneByThemeId(@Param('id') themeId: string) {
    try {
      return this.quizService.randomOneByThemeId(parseInt(themeId));
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiAcceptedResponse({
    type: Quiz,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiForbiddenResponse({
    description: "Vous n'avez pas le droit de faire ça.",
  })
  @Get()
  async findByUser(@Request() req: any) {
    try {
      return this.quizService.findByUserId(req.user.id);
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
