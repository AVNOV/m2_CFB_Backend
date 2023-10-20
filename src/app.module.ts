import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from './entities/user.entity';
import { UserModule } from './modules/user.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket.module';
import { MessageService } from './services/message.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'quizziky',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [MessageService],
})
export class AppModule {}
