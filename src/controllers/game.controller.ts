import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateGameDto } from 'src/dto/create-game.dto';
import { UpdateGameDto } from 'src/dto/update-game.dto';
import { Game } from 'src/entities/game.entity';
import { GameService } from 'src/services/game.service';
import { GameUserService } from 'src/services/gameUser.service';

@Controller('games')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly gameUserService: GameUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Game, isArray: false })
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiBody({ type: CreateGameDto })
  async create(@Body() body: CreateGameDto, @Request() req: any) {
    try {
      const game = await this.gameService.create(body.quizId);
      await this.gameUserService.create(game.id, req.user.id);

      return game;
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
  @ApiBody({ type: UpdateGameDto })
  @ApiCreatedResponse({ type: Game, isArray: false })
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiBadRequestResponse({
    description: "La partie que vous essayez de modifier n'existe pas.",
  })
  async update(
    @Param('id') gameId: string,
    @Body() body: UpdateGameDto,
    @Request() req: any,
  ) {
    try {
      return await this.gameUserService.update(
        parseInt(gameId),
        req.user.id,
        body.nbAnswers,
        body.nbCorrectAnswers,
      );
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/:id')
  @ApiCreatedResponse({ type: Game, isArray: false })
  @ApiInternalServerErrorResponse({ description: "Une erreur s'est produite." })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  async findOne(@Param('id') gameId: string) {
    try {
      return this.gameService.findOne(+gameId);
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
