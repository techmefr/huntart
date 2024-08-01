import { faker } from '@faker-js/faker';
import fs from 'fs/promises';
import path from 'path';

const getRandomUsers = async (db, count) => {
  const [users] = await db.query(
    'SELECT userId FROM user ORDER BY RAND() LIMIT ?',
    [count],
  );
  return users.map((user) => user.userId);
};

const getRandomAuthors = async (db, count) => {
  const [authors] = await db.query(
    'SELECT authorId FROM author ORDER BY RAND() LIMIT ?',
    [count],
  );
  return authors.map((author) => author.authorId);
};

const seedStreetArt = async (db) => {
  const totalImages = 68;
  const removedCount = 2;

  const imageFiles = await fs.readdir(
    path.join(process.cwd(), 'public', 'images', 'desktop'),
  );
  const userIds = await getRandomUsers(db, totalImages);
  const authorIds = await getRandomAuthors(db, totalImages);

  const streetArtItems = Array.from({ length: totalImages }, (_, index) => {
    const name = faker.lorem.words(3);
    const description = faker.lorem.paragraph();
    const authorId = authorIds[index % authorIds.length];
    const location = `Lyon ${faker.datatype.number({
      min: 1,
      max: 9,
    })}, ${faker.address.streetAddress()}`;
    const dateAdded = faker.date.past(2);
    const postedBy = userIds[index % userIds.length];
    const imageFile = imageFiles[index % imageFiles.length];
    const photoUrlSmall = `/images/mobile/${imageFile}`;
    const photoUrlMedium = `/images/tablet/${imageFile}`;
    const photoUrlLarge = `/images/desktop/${imageFile}`;
    const status = index < totalImages - removedCount ? 'active' : 'removed';

    return {
      name,
      description,
      authorId,
      location,
      dateAdded,
      postedBy,
      photoUrlSmall,
      photoUrlMedium,
      photoUrlLarge,
      status,
    };
  });

  const insertQuery = `
    INSERT INTO streetart 
    (name, description, authorId, location, dateAdded, postedBy, photoUrlSmall, photoUrlMedium, photoUrlLarge, status) 
    VALUES ?
  `;

  const values = streetArtItems.map((item) => [
    item.name,
    item.description,
    item.authorId,
    item.location,
    item.dateAdded,
    item.postedBy,
    item.photoUrlSmall,
    item.photoUrlMedium,
    item.photoUrlLarge,
    item.status,
  ]);

  await db.query(insertQuery, [values]);

  return streetArtItems;
};

export default seedStreetArt;
