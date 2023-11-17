import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from './entities/user.entity';
import { UserModule } from './modules/user.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket.module';
import { MessageService } from './services/message.service';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { Quiz } from './entities/quiz.entity';
import { Theme } from './entities/theme.entity';
import { Game } from './entities/game.entity';
import { GameUser } from './entities/game_user.entity';
import { ThemeModule } from './modules/theme.module';
import { QuizModule } from './modules/quiz.module';
import { GameModule } from './modules/game.module';
import { QuestionModule } from './modules/question.module';
import { AnswerModule } from './modules/answer.module';
import { RoomsModule } from './modules/rooms.module';
import { Room } from './entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: <'mysql' | 'postgres'>process.env.DB_TYPE,
      host: process.env.DB_HOST.toString(),
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER.toString(),
      password: process.env.DB_PASSWORD.toString(),
      database: 'quizziky',
      entities: [User, Answer, Question, Quiz, Theme, Game, GameUser, Room],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    SocketModule,
    ThemeModule,
    QuizModule,
    GameModule,
    QuestionModule,
    AnswerModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [MessageService],
})
export class AppModule {}
