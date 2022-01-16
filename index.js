const db = require('./db/connection');
const inquirer = require('inquirer');
const { actionList } = require('./utils/questions');
const { retrieveAllDept, retrieveAllRoles, retrieveAllEmployees } = require('./utils/showData');
const { addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./utils/addData');

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
                userPrompt();
            } else if (answer.action === 'View all roles') {
                retrieveAllRoles();
                userPrompt();
            } else if (answer.action === 'View all employees') {
                retrieveAllEmployees();
                userPrompt();
            } else if (answer.action === 'Add a department') {
                console.clear();
                addDepartment();
            } else if (answer.action === 'Add a role') {
                console.clear();
                addRole();
            } else if (answer.action === 'Add an employee') {
                console.clear();
                addEmployee();
            } else if (answer.action === 'Update an employee role') {
                console.clear();
                updateEmployeeRole();
            } else if (answer.action === 'End session') {
                console.log('Connection to employee tracker has been terminated.');
                db.end();
            }
            // userPrompt();
        })

}