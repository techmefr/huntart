const logoutMiddleware = (req, res, next) => {
  // logique pour blacklister le token si nécessaire
  req.userId = null;
  req.authToken = null;
  next();
};

module.exports = logoutMiddleware;
