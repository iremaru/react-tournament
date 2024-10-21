import { QuestionOptions, TestData, TestRequestParams } from '../models/tests';

const fakeTest: TestData[] = [
  {
    testNumber: 0,
    questions: [
      {
        questionTitle: 'Fake test question title',
        options: {
          optionA: {
            title: 'Answer A',
            isCorrect: true,
            order: 0,
          },
          optionB: {
            title: 'Answer B',
            isCorrect: false,
            order: 0,
          },
          optionC: {
            title: 'Answer C',
            isCorrect: false,
            order: 0,
          },
        },
      },
    ],
  },
];

export const getTest = (params: TestRequestParams) => {
  return fakeTest[params.testNumber].questions.forEach((question) => {
    question.options = randomizeOptionsOrder(question.options);
  });
};

const randomizeOptionsOrder = (options: QuestionOptions) => {
  const updatedOptions = { ...options };

  const A = Math.random() * 3;
  let B = Math.random() * 3;
  while (B == A) B = Math.random() * 3;
  const C = A + B === 1 ? 2 : A + B === 2 ? 1 : 0;

  updatedOptions.optionA.order = A;
  updatedOptions.optionB.order = B;
  updatedOptions.optionC.order = C;
  return updatedOptions;
};
