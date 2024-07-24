const { pool } = require('../src/utils/dbConnection');

async function migrateEmotion() {
  const connection = await pool.getConnection();
  try {
    await connection.query('DROP TABLE IF EXISTS emotion');
    await connection.query(`
      CREATE TABLE emotion (
        emotionId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
      )
    `);
    console.log('Emotion table migrated successfully.');
  } catch (error) {
    console.error('Error migrating emotion table:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateEmotion;
