const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const table = process.argv[2];

if (!table) {
  console.error('Please provide a table name.');
  process.exit(1);
}

const migrateScriptPath = path.resolve(
  __dirname,
  '../../database/migrations',
  `${table}.migrate.js`,
);

if (!fs.existsSync(migrateScriptPath)) {
  console.error(
    `Migration script for table ${table} does not exist at path ${migrateScriptPath}`,
  );
  process.exit(1);
}

exec(`node ${migrateScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing migration for ${table}:`, error);
    process.exit(1);
  }
  console.warn(`Migration for ${table} executed successfully:\n${stdout}`);
  if (stderr) console.error(`stderr: ${stderr}`);
});
