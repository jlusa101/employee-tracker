const db = require('./db/connection');
const inquirer = require('inquirer');
const { actionList } = require('./utils/questions');
const { retrieveAllDept, retrieveAllRoles, retrieveAllEmployees } = require('./utils/showData');
const { addDepartment, addRole, addEmployee } = require('./utils/addData');

// Establishing a connection to the database
db.connect(err => {
    if (err) throw err;
    userPrompt();
});


const userPrompt = () => {
    console.log('*************************************************');
    console.log('*                                               *');
    console.log('*                Welcome Manager                *');
    console.log('*                                               *');
    console.log('*************************************************');
    inquirer.prompt(actionList)
        .then(answer => {
            if (answer.action == 'View all departments') {
                retrieveAllDept();
            } else if (answer.action === 'View all roles') {
                retrieveAllRoles();
            } else if (answer.action === 'View all employees') {
                retrieveAllEmployees();
            } else if (answer.action === 'Add a department') {
                console.clear();
                addDepartment();
            } else if (answer.action === 'End session') {
                console.log('Connection to employee tracker has been terminated.');
                db.end();
            }

        })

}