const { pool } = require('../src/utils/dbConnection');

async function migrateStreetArt() {
  const connection = await pool.getConnection();
  try {
    await connection.query('DROP TABLE IF EXISTS streetart');
    await connection.query(`
      CREATE TABLE streetart (
        streetArtId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        authorId INT NOT NULL,
        location VARCHAR(255) NOT NULL,
        dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        postedBy INT NOT NULL,
        photoUrlSmall VARCHAR(255),
        photoUrlMedium VARCHAR(255),
        photoUrlLarge VARCHAR(255),
        status ENUM('active', 'removed') DEFAULT 'active',
        FOREIGN KEY (postedBy) REFERENCES user(userId) ON DELETE CASCADE,
        FOREIGN KEY (authorId) REFERENCES author(authorId) ON DELETE SET NULL
      )
    `);
    await connection.query('CREATE INDEX idx_streetart_authorId ON streetart(authorId)');
    await connection.query('CREATE INDEX idx_streetart_postedBy ON streetart(postedBy)');
    await connection.query('CREATE INDEX idx_streetart_dateAdded ON streetart(dateAdded)');
    await connection.query('CREATE INDEX idx_streetart_location ON streetart(location)');
    console.log('StreetArt table migrated successfully.');
  } catch (error) {
    console.error('Error migrating streetart table:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateStreetArt;