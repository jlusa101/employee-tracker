const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const questions = require('./utils/questions');
const { retrieveAllDept, retrieveAllRoles, retrieveAllEmployees } = require('./utils/showData');

// Establishing a connection to the database
db.connect(err => {
    if (err) throw err;
    userPrompt();
});


const userPrompt = () => {
    console.log('*************************************************');
    console.log('*                                               *');
    console.log('*                Welcome Manager                *');
    console.log('*           What would you like to do?          *');
    console.log('*                                               *');
    console.log('*************************************************');
    inquirer.prompt(questions)
        .then(answer => {
            if (answer.action == 'View all departments') {
                retrieveAllDept();
            } else if (answer.action === 'View all roles') {
                retrieveAllRoles();
            } else if (answer.action === 'View all employees') {
                retrieveAllEmployees();
            } else if (answer.action === 'End session') {
                console.log('Connection to employee tracker has been terminated.');
                db.end();
            }

            userPrompt();
        })

}