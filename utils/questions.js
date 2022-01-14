const actionList = [{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'End session']
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
    }, {
        type: 'list',
        name: 'departmentChoice',
        message: "Which department is the new role in?",
        choices: ['Engineering', 'Finance', 'Legal', 'Customer Service']
    }



];


module.exports = { actionList, deptAddition, roleAddition };