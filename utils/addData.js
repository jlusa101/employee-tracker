const inquirer = require('inquirer');
const { deptAddition, roleAddition } = require('./questions');

const addDepartment = () => {
    inquirer.prompt(deptAddition);
}

const addRole = () => {
    inquirer.prompt(roleAddition);
}

const addEmployee = () => {
    inquirer.prompt();
}

module.exports = { addDepartment, addRole, addEmployee };