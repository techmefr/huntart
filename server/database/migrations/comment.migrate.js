const { pool } = require('../src/utils/dbConnection');

async function migrateComment() {
  const connection = await pool.getConnection();
  try {
    await connection.query('DROP TABLE IF EXISTS comment');
    await connection.query(`
      CREATE TABLE comment (
        commentId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        streetArtId INT NOT NULL,
        content TEXT NOT NULL,
        datePosted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        isDeleted BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE,
        FOREIGN KEY (streetArtId) REFERENCES streetart(streetArtId) ON DELETE CASCADE
      )
    `);
    await connection.query('CREATE INDEX idx_comment_userId ON comment(userId)');
    await connection.query('CREATE INDEX idx_comment_streetArtId ON comment(streetArtId)');
    await connection.query('CREATE INDEX idx_comment_datePosted ON comment(datePosted)');
    console.log('Comment table migrated successfully.');
  } catch (error) {
    console.error('Error migrating comment table:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateComment;
