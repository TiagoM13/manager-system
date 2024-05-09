import { faker } from '@faker-js/faker';

import { Status, UserTypes } from '@/enums';
import { User } from '@/interfaces/users';

export const users: User[] = Array.from({ length: 100 }).map(() => ({
  id: faker.number.int({ min: 10000, max: 20000 }),
  name: faker.person.fullName(),
  email: faker.internet.email().toLocaleLowerCase(),
  image_url: faker.image.avatar(),
  user_type: UserTypes.ADMIN,
  status: Status.ACTIVE,
  created_at: faker.date.recent({ days: 30 }),
  last_access: faker.date.recent({ days: 7 }),
}));
