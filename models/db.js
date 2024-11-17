const { Pool } = require('pg');
require('dotenv').config(); // To load environment variables

// Create a new pool instance using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to test the database connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL successfully"))
  .catch((err) => console.error('Connection error', err.stack));

module.exports = pool;
