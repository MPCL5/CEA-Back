import { News } from 'src/domain/News';
import * as faker from 'faker';

export const fakeNewsGenerator = (): News => {
  const news = new News();
  faker.setLocale('fa');

  news.brief = faker.lorem.words(17);
  news.event = null;
  news.title = faker.lorem.words(3 + Math.ceil(Math.random() * 3));
  news.text = faker.lorem.paragraphs(1 + Math.ceil(Math.random() * 5));

  return news;
};
