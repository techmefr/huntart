const { pool } = require('../src/utils/dbConnection');

async function migrateAuthor() {
  const connection = await pool.getConnection();
  try {
    await connection.query('DROP TABLE IF EXISTS author');
    await connection.query(`
      CREATE TABLE author (
        authorId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      )
    `);
    console.log('Author table migrated successfully.');
  } catch (error) {
    console.error('Error migrating author table:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateAuthor;
