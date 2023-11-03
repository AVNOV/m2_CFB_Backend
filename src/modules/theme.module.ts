import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeController } from 'src/controllers/theme.controller';
import { Theme } from 'src/entities/theme.entity';
import { ThemeService } from 'src/services/theme.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  exports: [ThemeService],
  controllers: [ThemeController],
  providers: [ThemeService],
})
export class ThemeModule {}
