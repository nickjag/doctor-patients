require('dotenv').load();

module.exports = {
  BASE_URL: process.env.BASE_URL,
  CORS: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5000',
    ],
  },
  ERRORS: {
    responses: [
      'error_code',
      'error_type',
      'error_message',
      'error_context',
      'error_fields',
    ],
  },
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  PORT: 5000,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  VERSION: new Date().getTime(),
};