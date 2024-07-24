const { pool } = require('../src/utils/dbConnection');

async function migrateTag() {
  const connection = await pool.getConnection();
  try {
    await connection.query('DROP TABLE IF EXISTS tag');
    await connection.query(`
      CREATE TABLE tag (
        tagId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
      )
    `);
    console.log('Tag table migrated successfully.');
  } catch (error) {
    console.error('Error migrating tag table:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateTag;
