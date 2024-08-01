import { faker } from '@faker-js/faker';

const durations = [
  5 * 60, // 5 minutes
  10 * 60,
  15 * 60,
  30 * 60,
  60 * 60, // 1 heure
  3 * 60 * 60,
  24 * 60 * 60, // 1 jour
  3 * 24 * 60 * 60,
  7 * 24 * 60 * 60,
  30 * 24 * 60 * 60, // 1 mois
  90 * 24 * 60 * 60,
  180 * 24 * 60 * 60,
  365 * 24 * 60 * 60, // 1 an
  Number.MAX_SAFE_INTEGER, // à vie
];

const seedSanctions = (userIds) => {
  return durations.flatMap((duration) => {
    return ['login_failure', 'misbehavior'].map((type) => {
      const dateStart = faker.date.past();
      const dateEnd = new Date(dateStart.getTime() + duration * 1000);
      return {
        userId: faker.helpers.arrayElement(userIds),
        type,
        duration,
        dateStart,
        dateEnd,
      };
    });
  });
};

export default seedSanctions;
