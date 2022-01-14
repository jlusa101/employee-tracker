const db = require('./db/connection');
const inquirer = require('inquirer');
const questions = require('./utils/questions');

// Establishing a connection to the database
db.connect(err => {
    if (err) throw err;
    console.log('Welcome to an Employee Tracker!');
    console.log('===============================');
    inquirer.prompt(questions)
        .then(answer => console.log(answer));
});