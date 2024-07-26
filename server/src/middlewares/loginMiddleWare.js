const pool = require('../config/database');
const { comparePassword, generateToken } = require('../utils/authUtils');

const loginMiddleware = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT userId, password FROM user WHERE username = ?',
      [username],
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const match = await comparePassword(password, user.password);

    if (match) {
      const token = generateToken(user.userId);
      req.authToken = token;
      req.userId = user.userId;
      return next();
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loginMiddleware;
