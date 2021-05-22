const mysql = require('mysql2/promise');
require('dotenv').config();

let connection = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

/*connection.connect((err) => {
  if (err) throw err;
  console.log('Database Connected!');
});*/

module.exports = connection;
