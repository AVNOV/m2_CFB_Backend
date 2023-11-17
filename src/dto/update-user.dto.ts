import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/entities/room.entity';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  firstname: string;

  @ApiProperty({ required: false })
  lastname: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  password: string;

  @ApiProperty({ required: false })
  room: Room;
}
