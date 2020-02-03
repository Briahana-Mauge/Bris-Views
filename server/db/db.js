const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/youtube';
const db = pgp(connectionString);

module.exports = db;