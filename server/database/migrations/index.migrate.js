const mysql = require("mysql2/promise");
const fs = require("fs").promises;
const path = require("path");
const dbConfig = require("../src/config/database");

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
    );
    await connection.query(`USE ${dbConfig.database}`);
    console.log(`Database ${dbConfig.database} initialized.`);
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

module.exports = initializeDatabase;
