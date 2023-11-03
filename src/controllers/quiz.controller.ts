import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizService } from 'src/services/quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiAcceptedResponse({
    type: Quiz,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
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
}
