const { pool } = require("../src/utils/dbConnection");

async function migrateUser() {
  const connection = await pool.getConnection();
  try {
    await connection.query("DROP TABLE IF EXISTS user");
    await connection.query(`
      CREATE TABLE user (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        lastLogin TIMESTAMP NULL,
        role ENUM('admin', 'moderator', 'standard_user') DEFAULT 'standard_user'
      )
    `);
    await connection.query("CREATE INDEX idx_user_username ON user(username)");
    await connection.query("CREATE INDEX idx_user_email ON user(email)");
    await connection.query("CREATE INDEX idx_user_role ON user(role)");
    console.log("User table migrated successfully.");
  } catch (error) {
    console.error("Error migrating user table:", error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateUser;
