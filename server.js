const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    database: 'jitu',
    password: '7709840106',
});

if (connection) {
    console.log('connection is successfull....');
} else {
    console.log('not connected the database');
}

module.exports = connection;
