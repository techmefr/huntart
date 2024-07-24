const { pool } = require("../src/utils/dbConnection");

async function migrateReport() {
  const connection = await pool.getConnection();
  try {
    await connection.query("DROP TABLE IF EXISTS report");
    await connection.query(`
      CREATE TABLE report (
        reportId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        streetArtId INT NOT NULL,
        reason TEXT NOT NULL,
        dateReported TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'resolved') DEFAULT 'pending',
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE,
        FOREIGN KEY (streetArtId) REFERENCES streetart(streetArtId) ON DELETE CASCADE
      )
    `);
    await connection.query("CREATE INDEX idx_report_userId ON report(userId)");
    await connection.query(
      "CREATE INDEX idx_report_streetArtId ON report(streetArtId)"
    );
    await connection.query(
      "CREATE INDEX idx_report_dateReported ON report(dateReported)"
    );
    console.log("Report table migrated successfully.");
  } catch (error) {
    console.error("Error migrating report table:", error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = migrateReport;
