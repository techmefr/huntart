async function startServer(app, PORT) {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    if (error.code === "ER_BAD_DB_ERROR") {
      console.log(
        "Database does not exist. Please create it or check your configuration."
      );
    }
    process.exit(1);
  }
}
