const mysql = require('mysql2');

// Connecting to the database
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
);

module.exports = db;