const { faker } = require('@faker-js/faker');

const seedComments = (userIds, streetArtIds, count = 100) => {
  return Array.from({ length: count }, () => ({
    userId: faker.helpers.arrayElement(userIds),
    streetArtId: faker.helpers.arrayElement(streetArtIds),
    content: faker.lorem.paragraph(),
    datePosted: faker.date.past(),
    isDeleted: faker.datatype.boolean(0.1),
  }));
};

module.exports = seedComments;
