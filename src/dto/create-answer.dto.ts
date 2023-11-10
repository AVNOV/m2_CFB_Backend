import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  rightAnswer: boolean;

  @ApiProperty()
  questionId: number;
}
