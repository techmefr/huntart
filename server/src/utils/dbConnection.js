const pool = require('../config/database');

async function testConnection() {
  try {
    const connection = await pool.getConnection();

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    );

    await connection.query(`USE ${process.env.DB_NAME}`);

    console.info('Successfully connected to the database.');
    connection.release();
  } catch (error) {
    console.info('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = { testConnection };
