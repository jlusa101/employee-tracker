const inquirer = require('inquirer');
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer))

// Array of questions 
const questionList = [{
        type: 'loop',
        name: 'begin',
        message: 'Press enter to continue or n/N to quit',
        questions: [{
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        }]

    }

];

module.exports = questionList;