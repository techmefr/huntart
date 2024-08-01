const seedFavorites = async (db) => {
  const [users] = await db.query('SELECT userId FROM user');

  const [streetArts] = await db.query('SELECT streetArtId FROM streetart');

  const getRandomUniqueElements = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const favorites = users.flatMap((user) => {
    const favoriteStreetArts = getRandomUniqueElements(streetArts, 2);
    return favoriteStreetArts.map((streetArt) => ({
      userId: user.userId,
      streetArtId: streetArt.streetArtId,
    }));
  });

  if (favorites.length > 0) {
    const insertQuery = 'INSERT INTO favorite (userId, streetArtId) VALUES ?';
    const values = favorites.map((fav) => [fav.userId, fav.streetArtId]);
    await db.query(insertQuery, [values]);
  }

  return favorites;
};

export default seedFavorites;
