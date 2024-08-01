import { hashPassword } from '../../src/utils/authUtils';

const generatePassword = () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];

  const generateChars = (count, charSet) =>
    Array.from({ length: count }, () => getRandomChar(charSet));

  const password = [
    ...generateChars(2, lowercase),
    ...generateChars(2, uppercase),
    ...generateChars(2, numbers),
    ...generateChars(2, special),
    ...generateChars(4, lowercase + uppercase + numbers + special),
  ];

  return password.sort(() => 0.5 - Math.random()).join('');
};

const roles = ['admin', 'moderator', 'standard_user'];

const seedUsers = async () => {
  const createUsersForRole = async (role) => {
    return Promise.all(
      Array.from({ length: 5 }, async (_, index) => {
        const password = generatePassword();
        const hashedPassword = await hashPassword(password);
        return {
          username: `${role}_${index + 1}`,
          email: `${role}_${index + 1}@example.com`,
          password: hashedPassword,
          dateCreated: new Date(),
          lastLogin: null,
          role,
        };
      }),
    );
  };

  const usersArrays = await Promise.all(roles.map(createUsersForRole));
  return usersArrays.flat();
};

export default seedUsers;
