const pool = require('../config/database');

async function checkSanctions(userId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM sanction WHERE userId = ? AND dateEnd > NOW()',
      [userId],
    );
    return rows.length > 0;
  } finally {
    connection.release();
  }
}

async function countFailedAttempts(userId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT COUNT(*) AS failedAttempts FROM login_attempt WHERE userId = ? AND success = FALSE AND attemptTime >= (NOW() - INTERVAL 15 MINUTE)',
      [userId],
    );
    return rows[0].failedAttempts;
  } finally {
    connection.release();
  }
}

async function applySanction(userId) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      'INSERT INTO sanction (userId, type, duration, dateStart, dateEnd) VALUES (?, "login_failure", 30, NOW(), NOW() + INTERVAL 30 MINUTE)',
      [userId],
    );
  } finally {
    connection.release();
  }
}

async function sanctionMiddleware(req, res, next) {
  const { userId } = req;

  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  const hasActiveSanctions = await checkSanctions(userId);
  if (hasActiveSanctions) {
    return res
      .status(403)
      .send(
        'Account is temporarily locked due to multiple failed login attempts',
      );
  }

  const failedAttempts = await countFailedAttempts(userId);
  if (failedAttempts >= 5) {
    await applySanction(userId);
    return res
      .status(403)
      .send('Too many failed login attempts. Account is temporarily locked.');
  }

  next();
  return true;
}

module.exports = sanctionMiddleware;
