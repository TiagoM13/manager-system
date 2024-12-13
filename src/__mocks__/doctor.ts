import { Status } from '@/enums';
import { IDoctor } from '@/interfaces';
import { sortEnum } from '@/utils';
import { faker } from '@faker-js/faker';

export const doctor: IDoctor = {
  id: faker.number.int(),
  name: faker.person.fullName(),
  birth_date: faker.date.past(),
  sex: faker.person.sex(),
  avatar_url: faker.image.avatar(),
  crm: faker.word.verb(),
  specialty: faker.person.jobTitle(),
  working_days: [faker.number.int()],
  appointment_id: faker.string.uuid(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  status: sortEnum(Status),
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
};
