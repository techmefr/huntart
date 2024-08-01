import { faker } from '@faker-js/faker';

const seedReports = async (db) => {
  const [users] = await db.query('SELECT userId FROM user');

  const [streetArts] = await db.query('SELECT streetArtId FROM streetart');

  const commonReasons = [
    'Contenu inapproprié',
    "Violation du droit d'auteur",
    'Information trompeuse',
    'Spam',
    'Harcèlement',
    'Violence',
    'Autre',
  ];

  const reportsCount = Math.ceil(streetArts.length * 0.1);

  const reports = Array.from({ length: reportsCount }, () => {
    const reporter = users[Math.floor(Math.random() * users.length)];
    const reportedStreetArt =
      streetArts[Math.floor(Math.random() * streetArts.length)];
    const reason = faker.helpers.arrayElement(commonReasons);
    const status = faker.helpers.arrayElement(['pending', 'resolved']);
    const dateReported = faker.date.past(1); // Dans la dernière année

    return {
      userId: reporter.userId,
      streetArtId: reportedStreetArt.streetArtId,
      reason,
      dateReported,
      status,
    };
  });

  if (reports.length > 0) {
    const insertQuery = `
      INSERT INTO report 
      (userId, streetArtId, reason, dateReported, status) 
      VALUES ?
    `;
    const values = reports.map((report) => [
      report.userId,
      report.streetArtId,
      report.reason,
      report.dateReported,
      report.status,
    ]);
    await db.query(insertQuery, [values]);
  }

  return reports;
};

export default seedReports;
