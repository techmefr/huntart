const { pool } = require('../src/utils/dbConnection');

async function migrateSanction() {
  const connection = await pool.getConnection();
  try {
    await connection.query('DROP TABLE IF EXISTS sanction');
    await connection.query(`
      CREATE TABLE sanction (
        sanctionId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        type ENUM('login_failure', 'misbehavior') NOT NULL,
        duration INT NOT NULL,
        dateStart TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        dateEnd TIMESTAMP NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE
      )
    `);
    await connection.query('CREATE INDEX idx_sanction_userId ON sanction(userId)');
    await connection.query('CREATE INDEX idx_sanction_type ON sanction(type)');
    await connection.query('CREATE INDEX idx_sanction_dateEnd ON sanction(dateEnd)');
    console.log('Sanction table migrated successfully.');
  } catch (error) {
    console.error('Error migrating sanction table:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateSanction;
