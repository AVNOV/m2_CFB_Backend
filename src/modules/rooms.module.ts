import { Module } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { RoomsController } from '../controllers/rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { Game } from 'src/entities/game.entity';
import { GameService } from 'src/services/game.service';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizService } from 'src/services/quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User, Game, Quiz])],
  controllers: [RoomsController],
  providers: [RoomsService, UserService, GameService, QuizService],
})
export class RoomsModule {}
