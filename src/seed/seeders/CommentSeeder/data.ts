import { Comment } from 'src/domain/Comment';
import * as faker from 'faker';

export const fakeCommentGenrator = (): Comment => {
  const comment = new Comment();
  faker.setLocale('fa');
  comment.name = `${faker.name.findName()} ${faker.name.lastName()}`;
  comment.admited = true;
  comment.text = faker.lorem.words(25 + Math.ceil(Math.random() * 20));

  return comment;
};
