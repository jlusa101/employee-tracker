const inquirer = require('inquirer');
const db = require('../db/connection');
const { deptAddition, roleAddition, employeeAddition } = require('./questions');


const addDepartment = () => {
    inquirer.prompt(deptAddition)
        .then(answers => insertDept(answers.newDepartment));
}

const insertDept = (dept) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;

    db.query(sql, dept, (err, result) => {
        if (err)() => console.log(err);
        console.log('Department succesfully added into the database!');
    })
}

const addRole = () => {
    inquirer.prompt(roleAddition)
        .then(answers => insertRole(answers.newRole, answers.salaryInput));
}

const insertRole = (roleName, salary) => {
    const params = [roleName, salary];
    const departmentSql = `SELECT id, name FROM department`;
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

    db.query(departmentSql, (err, result) => {
        if (err)() => console.log(err);

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
                })
            });
    })

}


const addEmployee = () => {
    inquirer.prompt(employeeAddition)
        .then(answers => insertEmployee(answers.fName, answers.lName));
}

const insertEmployee = (fname, lname) => {
    const params = [fname, lname];
    const roleSql = `SELECT title, id FROM roles`;
    const managerSql = `SELECT * FROM employee`;
    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

    db.query(roleSql, (err, result) => {
        if (err)() => console.log(err);

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
                    })
                });
        })


    })
}

const updateEmployeeRole = () => {
    const findEmployeeSql = `SELECT * FROM employee`;
    const getAllRolesSql = `SELECT title, id FROM roles`;

    db.query(getAllRolesSql, (err, result) => {
        if (err)() => console.log(err);

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
                    })

                });
        })


    })
}

module.exports = { addDepartment, addRole, addEmployee, updateEmployeeRole };