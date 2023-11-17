import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/entities/game.entity';

export class UpdateRoomDto {
  @ApiProperty({ required: false })
  code?: string;

  @ApiProperty({ required: false })
  game?: Game;
}
