const seedUserEmotions = async (db) => {
  const [users] = await db.query('SELECT userId FROM user');

  const [streetArts] = await db.query('SELECT streetArtId FROM streetart');

  const [emotions] = await db.query('SELECT emotionId FROM emotion');

  const getRandomUniqueElements = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const userEmotions = users.flatMap((user) => {
    const selectedStreetArts = getRandomUniqueElements(streetArts, 3);
    return selectedStreetArts.map((streetArt) => {
      const randomEmotion =
        emotions[Math.floor(Math.random() * emotions.length)];
      return {
        userId: user.userId,
        streetArtId: streetArt.streetArtId,
        emotionId: randomEmotion.emotionId,
      };
    });
  });

  if (userEmotions.length > 0) {
    const insertQuery =
      'INSERT INTO user_emotion (userId, streetArtId, emotionId) VALUES ?';
    const values = userEmotions.map((ue) => [
      ue.userId,
      ue.streetArtId,
      ue.emotionId,
    ]);
    await db.query(insertQuery, [values]);
  }

  return userEmotions;
};

export default seedUserEmotions;
