import seedUsers from './user.seed';
import seedAuthors from './author.seed';
import seedComments from './comment.seed';
import seedSanctions from './sanction.seed';
import pool from '../../src/config/database';

const seedDatabase = async () => {
  let connection;
  try {
    connection = await pool.getConnection();

    // Seed des utilisateurs
    const users = await seedUsers();
    await Promise.all(
      users.map((user) => connection.query('INSERT INTO user SET ?', user)),
    );
    console.info('Users seeded successfully');

    // Seed des auteurs
    const authors = seedAuthors();
    await Promise.all(
      authors.map((author) =>
        connection.query('INSERT INTO author SET ?', author),
      ),
    );
    console.info('Authors seeded successfully');

    // Récupérer les IDs des utilisateurs et des street arts pour les commentaires
    const [userRows] = await connection.query('SELECT userId FROM user');
    const [streetArtRows] = await connection.query(
      'SELECT streetArtId FROM streetart',
    );

    const userIds = userRows.map((row) => row.userId);
    const streetArtIds = streetArtRows.map((row) => row.streetArtId);

    // Seed des commentaires
    const comments = seedComments(userIds, streetArtIds);
    await Promise.all(
      comments.map((comment) =>
        connection.query('INSERT INTO comment SET ?', comment),
      ),
    );
    console.info('Comments seeded successfully');

    // Seed des sanctions
    const sanctions = seedSanctions(userIds);
    await Promise.all(
      sanctions.map((sanction) =>
        connection.query('INSERT INTO sanction SET ?', sanction),
      ),
    );
    console.info('Sanctions seeded successfully');

    console.info('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (connection) await connection.release();
    await pool.end();
  }
};

seedDatabase();
