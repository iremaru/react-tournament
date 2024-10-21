export type TestRequestParams = {
  testNumber: number;
};

export type Answer = {
  title: string;
  isCorrect: boolean;
  order: number;
};

export type QuestionOptions = {
  optionA: Answer;
  optionB: Answer;
  optionC: Answer;
};

export type Question = {
  questionTitle: string;
  options: QuestionOptions;
};

export type TestData = {
  testNumber: number;
  questions: Question[];
};

export type TestTry = {
  tryCount: number; //intento - Este es el intento número n
  mistakes: number;
};

export type testTries = {
  testNumber: number;
  tries: TestTry[];
};

export type UserTestsData = {
  user: string;
  testDone: testTries[];
};
