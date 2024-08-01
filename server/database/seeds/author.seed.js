import { faker } from '@faker-js/faker';

const seedAuthors = (count = 20) => {
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
  }));
};

export default seedAuthors;
