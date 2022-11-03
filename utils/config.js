require('dotenv').config();

const { MONGODB_URI, TEST_MONGODB_URI, NODE_ENV } = process.env;
const { PORT } = process.env;

module.exports = {
  MONGODB_URI: NODE_ENV === 'test' ? TEST_MONGODB_URI : MONGODB_URI,
  PORT,
};
