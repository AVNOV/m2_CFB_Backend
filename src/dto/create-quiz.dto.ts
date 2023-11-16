import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  difficulty: number;

  @ApiProperty()
  themeId: number;
}
