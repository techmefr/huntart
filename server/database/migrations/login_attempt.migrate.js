const { pool } = require("../src/utils/dbConnection");

async function migrateLoginAttempt() {
  const connection = await pool.getConnection();
  try {
    await connection.query("DROP TABLE IF EXISTS login_attempt");
    await connection.query(`
      CREATE TABLE login_attempt (
        attemptId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        attemptTime TIMESTAMP NOT NULL,
        success BOOLEAN NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE
      )
    `);
    await connection.query(
      "CREATE INDEX idx_login_attempt_userId ON login_attempt(userId)"
    );
    await connection.query(
      "CREATE INDEX idx_login_attempt_attemptTime ON login_attempt(attemptTime)"
    );
    console.log("LoginAttempt table migrated successfully.");
  } catch (error) {
    console.error("Error migrating login_attempt table:", error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateLoginAttempt;
