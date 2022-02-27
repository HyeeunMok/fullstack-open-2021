require('dotenv').config();

const MONGDB_URI = process.env.MONGODB_URI;

module.exports = { MONGDB_URI };
