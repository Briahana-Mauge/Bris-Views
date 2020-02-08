const pgp = require('pg-promise')();
// const connectionString = 'postgres://localhost:5432/youtube';
const connectionString = process.env.DATABASE_URL
const db = pgp(connectionString);

module.exports = db;