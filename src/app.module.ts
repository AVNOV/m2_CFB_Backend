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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'quizziky',
      entities: [User, Answer, Question, Quiz, Theme, Game, GameUser],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    SocketModule,
    ThemeModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [MessageService],
})
export class AppModule {}
