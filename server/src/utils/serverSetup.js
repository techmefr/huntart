const { testConnection } = require("./dbConnection");

async function startServer(app, PORT) {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

module.exports = { startServer };
