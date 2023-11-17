import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from 'src/controllers/game.controller';
import { Game } from 'src/entities/game.entity';
import { GameUser } from 'src/entities/game_user.entity';
import { GameService } from 'src/services/game.service';
import { GameUserService } from 'src/services/gameUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GameUser])],
  exports: [GameService],
  controllers: [GameController],
  providers: [GameService, GameUserService],
})
export class GameModule {}
