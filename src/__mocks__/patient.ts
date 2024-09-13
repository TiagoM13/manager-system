import { Status } from '@/enums';
import { IPatient } from '@/interfaces';
import { sortEnum } from '@/utils';
import { faker } from '@faker-js/faker';

export const patient: IPatient = {
  id: faker.number.int({ min: 100, max: 1000 }),
  name: faker.person.fullName(),
  sex: faker.person.sex(),
  birth_date: faker.date.birthdate(),
  cpf: String(faker.number.int({ min: 1, max: 100000000000 })),
  cns: String(faker.number.int({ min: 1, max: 100000000000000 })),
  address: faker.location.streetAddress(),
  father_name: faker.person.fullName({ sex: 'male' }),
  mother_name: faker.person.fullName({ sex: 'female' }),
  status: sortEnum(Status),
  // material_status: faker,
  occupation: faker.person.jobTitle(),
  created_at: faker.date.recent({ days: 30 }),
  updated_at: faker.date.recent({ days: 2 }),
};
