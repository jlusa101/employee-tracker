// Required dependancies
const db = require('./db/connection');
const inquirer = require('inquirer');
const { actionList, deptAddition, roleAddition, employeeAddition } = require('./utils/questions');
const cTable = require('console.table');

// Establishing a connection to the database
db.connect(err => {
    if (err)() => console.log(err);
    userPrompt();

});

// Function that begins the application by asking the user questions
const userPrompt = () => {
    console.log('*************************************************');
    console.log('*                                               *');
    console.log('*                Welcome Manager                *');
    console.log('*                                               *');
    console.log('*************************************************');
    inquirer.prompt(actionList)
        .then(answer => {
            switch (answer.action) {
                case 'View all departments':
                    retrieveAllDept();
                    break;
                case 'View all roles':
                    retrieveAllRoles();
                    break;
                case 'View all employees':
                    retrieveAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'End session':
                    console.log('Connection to employee tracker has been terminated.');
                    db.end();
                    break;
            }

        })
}

// Function to retrieve all departments and display to the user
const retrieveAllDept = () => {
    const sql = ` SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err)() => console.log(err);
        console.clear();
        console.table(rows)
        userPrompt();
    })

}

// Function to retrieve all roles and display to the user
const retrieveAllRoles = () => {
    const sql = ` SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err)() => console.log(err);
        console.clear();
        console.table(rows)
        userPrompt();
    })


}

// Function to retrieve all employees and display to the user
const retrieveAllEmployees = () => {
    const sql = ` SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err)() => console.log(err);
        console.clear();
        console.table(rows)
        userPrompt();
    })


}

// Function that asks the user what is the new department's name and then passes the answer to another function
const addDepartment = () => {
    inquirer.prompt(deptAddition)
        .then(answers => insertDept(answers.newDepartment));
}

// Inserts the new department into the database
const insertDept = (dept) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;

    db.query(sql, dept, (err, result) => {
        if (err)() => console.log(err);
        console.log('Department succesfully added into the database!');
        userPrompt();
    })
}

// Function that asks the user questions about the new role and passes that information to another function
const addRole = () => {
    inquirer.prompt(roleAddition)
        .then(answers => insertRole(answers.newRole, answers.salaryInput));
}

// Function that inserts the new role into the database
const insertRole = (roleName, salary) => {
    const params = [roleName, salary];
    const departmentSql = `SELECT id, name FROM department`;
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

    db.query(departmentSql, (err, result) => {
        if (err)() => console.log(err);
        console.clear();
        const department = result.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([{
                type: 'list',
                name: 'dept',
                message: 'Please choose a department to place the role in.',
                choices: department
            }])
            .then(choice => {
                params.push(choice.dept);

                db.query(sql, params, (err, result) => {
                    if (err)() => console.log(err);
                    console.log('Role succesfully added into the database!');
                    userPrompt();
                })
            });
    })

}

// Function that asks the user questions about the new employee and passes that information to another function
const addEmployee = () => {
    inquirer.prompt(employeeAddition)
        .then(answers => insertEmployee(answers.fName, answers.lName));
}

// Function that inserts the employee into the database
const insertEmployee = (fname, lname) => {
    const params = [fname, lname];
    const roleSql = `SELECT title, id FROM roles`;
    const managerSql = `SELECT * FROM employee`;
    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

    db.query(roleSql, (err, result) => {
        if (err)() => console.log(err);
        console.clear();
        const allRoles = result.map(({ id, title }) => ({ name: title, value: id }));

        db.query(managerSql, (err, result) => {
            if (err)() => console.log(err);
            const allEmp = result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

            inquirer.prompt([{
                        type: 'list',
                        name: 'roleChoice',
                        message: "What role do you wish assign the new employee?",
                        choices: allRoles
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is the manager of the new employee?",
                        choices: allEmp
                    }
                ])
                .then(choice => {
                    params.push(choice.roleChoice);
                    params.push(choice.manager);

                    db.query(sql, params, (err, result) => {
                        if (err)() => console.log(err);
                        console.log('Employee succesfully added into the database!');
                        userPrompt();
                    })
                });
        })


    })
}

// Function that asks the user which employee's role they wish to change and then updates it in the database
const updateEmployeeRole = () => {
    const findEmployeeSql = `SELECT * FROM employee`;
    const getAllRolesSql = `SELECT title, id FROM roles`;

    db.query(getAllRolesSql, (err, result) => {
        if (err)() => console.log(err);
        console.clear();
        const allRoles = result.map(({ id, title }) => ({ name: title, value: id }));

        db.query(findEmployeeSql, (err, result) => {
            if (err)() => console.log(err);
            const allEmp = result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

            inquirer.prompt([{
                        type: 'list',
                        name: 'chosenOne',
                        message: "Which employee's role do you wish to update?",
                        choices: allEmp
                    },
                    {
                        type: 'list',
                        name: 'newRole',
                        message: "What is this employee's new role?",
                        choices: allRoles
                    }
                ])
                .then(answers => {
                    const updateEmpSql = `UPDATE employee SET role_id=? WHERE id=?`;
                    const params = [answers.newRole, answers.chosenOne];

                    db.query(updateEmpSql, params, (err, result) => {
                        if (err)() => console.log(err);
                        console.log("Employee successfully updated!");
                        userPrompt();
                    })

                });
        })


    })
}

module.exports = { userPrompt };