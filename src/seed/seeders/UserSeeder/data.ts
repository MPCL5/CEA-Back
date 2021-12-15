import { User } from 'src/domain/User';
import * as faker from 'faker';
import { Name } from 'src/domain/Name';
import { hashSync } from 'bcryptjs';

export const fakeUserGenerator = (): User => {
  const user = new User();
  const name = new Name();

  name.first = faker.name.firstName();
  name.last = faker.name.lastName();
  user.name = name;
  user.password = hashSync('Password@123', 10);

  return user;
};
