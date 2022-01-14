const db = require('../db/connection');

const retrieveAllDept = () => {
    const sql = ` SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err)() => console.log(err);
        console.table(rows);
    })
}

const retrieveAllRoles = () => {
    const sql = ` SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err)() => console.log(err);
        console.table(rows);
    })
}

const retrieveAllEmployees = () => {
    const sql = ` SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err)() => console.log(err);
        console.table(rows);
    })
}

module.exports = { retrieveAllDept, retrieveAllRoles, retrieveAllEmployees };