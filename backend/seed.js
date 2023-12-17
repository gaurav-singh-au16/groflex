
const faker = require('faker');
const sequelize = require('./src/helpers/db.helper');

const User = require('./src/schemas/user.schema');

const generateDummyUser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  gender: faker.random.arrayElement([0, 1]),
  dob: '2017-05-05',
  country: faker.address.country(),
  state: faker.address.state(),
  city: faker.address.city(),
  zip: faker.address.zipCode(),
  interest: faker.random.arrayElement([0, 1, 2, 3]),
  password: '123'
});

const seed = async () => {
  await sequelize.sync({ force: true }); 

  const numberOfUsers = 10;

  const dummyUsers = Array.from({ length: numberOfUsers }, generateDummyUser);

  await User.bulkCreate(dummyUsers);

  console.log(`${numberOfUsers} dummy users seeded successfully.`);
};

seed()
  .then(() => process.exit())
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
