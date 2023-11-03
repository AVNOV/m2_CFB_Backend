import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from 'src/entities/theme.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme) private themeRepository: Repository<Theme>,
  ) {}

  async findAll(): Promise<Theme[]> {
    return await this.themeRepository.find();
  }
}
