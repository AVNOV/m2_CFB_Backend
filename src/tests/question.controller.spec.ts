import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionController } from 'src/controllers/question.controller';
import { Question } from 'src/entities/question.entity';
import { QuestionService } from 'src/services/question.service';

describe('QuestionController', () => {
  let questionController: QuestionController;
  let questionService: QuestionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useValue: {},
        },
      ],
    }).compile();

    questionService = moduleRef.get<QuestionService>(QuestionService);
    questionController = moduleRef.get<QuestionController>(QuestionController);
  });

  describe('create', () => {
    it('Crée une question', async () => {
      const question = <Question>{
        id: 1,
        title: faker.lorem.sentence(),
      };

      jest
        .spyOn(questionService, 'create')
        .mockImplementation(() => new Promise((resolve) => resolve(question)));

      expect(
        await questionController.create({ ...question, quizId: null }),
      ).toBe(question);
    });
  });
});
