import { ApiProperty } from '@nestjs/swagger';

export class UpdateGameDto {
  @ApiProperty()
  nbCorrectAnswers: number;

  @ApiProperty()
  nbAnswers: number;
}
