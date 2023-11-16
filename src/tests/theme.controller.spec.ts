import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ThemeController } from 'src/controllers/theme.controller';
import { Theme } from 'src/entities/theme.entity';
import { ThemeService } from 'src/services/theme.service';

describe('ThemeController', () => {
  let themeController: ThemeController;
  let themeService: ThemeService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ThemeController],
      providers: [
        ThemeService,
        {
          provide: getRepositoryToken(Theme),
          useValue: {},
        },
      ],
    }).compile();

    themeService = moduleRef.get<ThemeService>(ThemeService);
    themeController = moduleRef.get<ThemeController>(ThemeController);
  });

  describe('findAll', () => {
    it('Retourne un tableau de thèmes', async () => {
      const result = <Theme[]>[
        {
          id: 1,
          name: faker.lorem.sentence(),
        },
        {
          id: 2,
          name: faker.lorem.sentence(),
        },
      ];

      jest
        .spyOn(themeService, 'findAll')
        .mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await themeController.findAll()).toBe(result);
    });
  });
});
