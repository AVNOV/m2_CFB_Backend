import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerController } from 'src/controllers/answer.controller';
import { Answer } from 'src/entities/answer.entity';
import { AnswerService } from 'src/services/answer.service';

describe('AnswerController', () => {
  let answerController: AnswerController;
  let answerService: AnswerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [
        AnswerService,
        {
          provide: getRepositoryToken(Answer),
          useValue: {},
        },
      ],
    }).compile();

    answerService = moduleRef.get<AnswerService>(AnswerService);
    answerController = moduleRef.get<AnswerController>(AnswerController);
  });

  describe('create', () => {
    it('Crée une réponse', async () => {
      const answer = <Answer>{
        id: 1,
        title: faker.lorem.sentence(),
        rightAnswer: faker.datatype.boolean(),
      };

      jest
        .spyOn(answerService, 'create')
        .mockImplementation(() => new Promise((resolve) => resolve(answer)));

      expect(
        await answerController.create({ ...answer, questionId: null }),
      ).toBe(answer);
    });
  });
});
