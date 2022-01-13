DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INTEGER PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9, 2),
  department_id INTEGER,
  CONSTRAINT fk_dept_id FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT fk_mgr_id FOREIGN KEY (manager_id) REFERENCES employee(id)
);