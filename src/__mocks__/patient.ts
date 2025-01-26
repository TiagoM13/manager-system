import { MaritalStatus, Status } from '@/enums';
import { Sex } from '@/enums/sex';
import { IPatient } from '@/interfaces';
import { sortEnum } from '@/utils';
import { faker } from '@faker-js/faker';

export const patient: IPatient = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  sex: faker.person.sex() as Sex,
  birth_date: faker.date.birthdate(),
  cpf: String(faker.number.int({ min: 1, max: 100000000000 })),
  cns: String(faker.number.int({ min: 1, max: 100000000000000 })),
  address: faker.location.streetAddress(),
  father_name: faker.person.fullName({ sex: 'male' }),
  mother_name: faker.person.fullName({ sex: 'female' }),
  status: sortEnum(Status),
  marital_status: faker.person.middleName() as MaritalStatus,
  occupation: faker.person.jobTitle(),
  created_at: faker.date.recent({ days: 30 }),
  updated_at: faker.date.recent({ days: 2 }),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  weight: faker.number.int({ min: 20, max: 500 }),
  height: faker.number.int({ min: 60, max: 300 }),
  health_agent: faker.person.fullName(),
  name_contact_emergency: faker.person.fullName(),
  contact_emergency: faker.phone.number(),
  appointments: [],
};
