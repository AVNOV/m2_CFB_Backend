import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  firstname: string;

  @ApiProperty({ required: false })
  lastname: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  password: string;
}
