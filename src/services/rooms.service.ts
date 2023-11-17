import { Injectable } from '@nestjs/common';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { GameService } from './game.service';
import { QuizService } from './quiz.service';
import { Game } from 'src/entities/game.entity';
import { Quiz } from 'src/entities/quiz.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private userService: UserService,
    private gameService: GameService,
    private quizService: QuizService,
  ) {}

  async create(userEmail: string): Promise<Room> {
    const room: Room = this.roomRepository.create();
    await this.roomRepository.save(room);
    const code = Math.floor(room.id * Date.now())
      .toString(36)
      .toUpperCase();
    await this.update(room.id, { code: code });
    const newRoom: Room = await this.findOne(room.id);
    const currentUser = await this.userService.findOne(userEmail);
    await this.userService.update(currentUser.id, {
      ...currentUser,
      room: newRoom,
    });
    return await this.findOne(room.id);
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find({ relations: ['users', 'game'] });
  }

  async findOne(id: number): Promise<Room> {
    return await this.roomRepository.findOne({
      where: { id: id },
      relations: ['users', 'game'],
    });
  }

  async findOneByCode(code: string): Promise<Room> {
    return await this.roomRepository.findOne({
      where: { code: code },
      relations: ['users', 'game'],
    });
  }

  async addUser(code: string, userEmail: string): Promise<Room> {
    const room: Room = await this.findOneByCode(code);
    const currentUser: User = await this.userService.findOne(userEmail);
    await this.userService.update(currentUser.id, {
      ...currentUser,
      room: room,
    });
    return await this.findOneByCode(code);
  }

  async addGame(userEmail: string, themeId: number): Promise<Room> {
    const currentUser: User = await this.userService.findOne(userEmail);
    const quiz: Quiz = await this.quizService.randomOneByThemeId(themeId);
    const game: Game = await this.gameService.create(quiz.id);
    await this.update(currentUser.room.id, { ...currentUser.room, game: game });
    return await this.findOne(currentUser.room.id);
  }

  async update(
    id: number,
    updateRoomDto: UpdateRoomDto,
  ): Promise<UpdateResult> {
    return await this.roomRepository.update(id, updateRoomDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.roomRepository.delete(id);
  }
}
