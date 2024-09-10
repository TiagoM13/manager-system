import { Status, Role } from '@/enums';
import { IUser } from '@/interfaces';
import { sortEnum } from '@/utils';
import { faker } from '@faker-js/faker';

export const user: IUser = {
  id: faker.number.int({ min: 10000, max: 20000 }),
  name: faker.person.fullName(),
  email: faker.internet.email().toLocaleLowerCase(),
  image_url: faker.image.avatar(),
  role: sortEnum(Role),
  status: sortEnum(Status),
  created_at: faker.date.recent({ days: 30 }),
  last_access: faker.date.recent({ days: 7 }),
};
