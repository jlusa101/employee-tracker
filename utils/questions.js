const actionList = [{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'End session']
    }

];

const deptAddition = [{
        type: 'input',
        name: 'newDepartment',
        message: "What is the name of the new department? (Required)",
        validate: department => {
            if (department) {
                return true;
            } else {
                console.log('Please enter a department name!');
                return false;
            }
        }
    }

];

const roleAddition = [{
    type: 'input',
    name: 'newRole',
    message: "What is the name of the new role? (Required)",
    validate: role => {
        if (role) {
            return true;
        } else {
            console.log('Please enter a role name!');
            return false;
        }
    }
}, {
    type: 'input',
    name: 'salaryInput',
    message: "What is the salary of the new role? (Required)",
    validate: salary => {
        if (salary) {
            return true;
        } else {
            console.log('Please enter a proper salary!');
            return false;
        }
    }
}];

const employeeAddition = [{
    type: 'input',
    name: 'fName',
    message: "What is the first name of the new employee? (Required)",
    validate: firstName => {
        if (firstName) {
            return true;
        } else {
            console.log('Please enter a first name!');
            return false;
        }
    }
}, {
    type: 'input',
    name: 'lName',
    message: "What is the last name of the new employee? (Required)",
    validate: lastName => {
        if (lastName) {
            return true;
        } else {
            console.log('Please enter a last name!');
            return false;
        }
    }
}];


module.exports = { actionList, deptAddition, roleAddition, employeeAddition };