const { pool } = require('../src/utils/dbConnection');

async function migrateUserEmotion() {
  const connection = await pool.getConnection();
  try {
    await connection.query('DROP TABLE IF EXISTS user_emotion');
    await connection.query(`
      CREATE TABLE user_emotion (
        userId INT NOT NULL,
        streetArtId INT NOT NULL,
        emotionId INT NOT NULL,
        PRIMARY KEY (userId, streetArtId, emotionId),
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE,
        FOREIGN KEY (streetArtId) REFERENCES streetart(streetArtId) ON DELETE CASCADE,
        FOREIGN KEY (emotionId) REFERENCES emotion(emotionId) ON DELETE CASCADE
      )
    `);
    await connection.query('CREATE INDEX idx_user_emotion_userId ON user_emotion(userId)');
    await connection.query('CREATE INDEX idx_user_emotion_streetArtId ON user_emotion(streetArtId)');
    await connection.query('CREATE INDEX idx_user_emotion_emotionId ON user_emotion(emotionId)');
    console.log('UserEmotion table migrated successfully.');
  } catch (error) {
    console.error('Error migrating user_emotion table:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateUserEmotion;
