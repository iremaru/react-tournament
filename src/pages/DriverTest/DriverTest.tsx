import { useState } from 'react';
import { Question, TestData } from '../../models/tests';

export const DriverText = (test: TestData) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <>
      <h1>Test {test.testNumber}</h1>
      {/*VIEW OF CURRENT QUESTION*/}
      {CurrentQuestionView(test.questions[currentQuestion])}

      {/*BUTTON TO EACH QUESTION*/}
      <div className="question-btn-list">
        {test.questions.map((question, index) => (
          <button
            key={`testquestbtn${index}q${question.questionTitle[0]}`}
            title={question.questionTitle}
            onClick={() => setCurrentQuestion(index)}
          >
            {index}
          </button>
        ))}
      </div>
    </>
  );
};

const CurrentQuestionView = (question: Question) => {
  const answers = [];
  answers[question.options.optionA.order] = question.options.optionA;
  answers[question.options.optionB.order] = question.options.optionB;
  answers[question.options.optionC.order] = question.options.optionC;

  return (
    <div>
      <p>{question.questionTitle}</p>
      <ul>
        {question.options.map((answer) => (
          <li>
            <input type="checkbox" />
            {answer.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
