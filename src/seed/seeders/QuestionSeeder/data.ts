import * as faker from 'faker';
import { Question } from 'src/domain/Question';

export const fakeQuestionGenerator = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const text = faker.lorem.words(45);
  const contact = faker.internet.email();

  const question = new Question();
  question.name = firstName + ' ' + lastName;
  question.text = text;
  question.contact = contact;

  return question;
};
