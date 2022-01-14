INSERT INTO department (name) VALUES 
('Engineering'),
('Finance'),
('Legal'),
('Customer Service');

INSERT INTO roles (title, salary, department_id) VALUES
('Software Developer', 70000, 1),           
('Lead Developer', 86500, 1),               
('Accountant', 58000, 2),                   
('Accounting Supervisor', 76000, 2),        
('Lawyer', 74000, 3),                       
('Legal Team Lead', 90800, 3),              
('Customer Service Rep', 32000, 4),         
('Customer Service Supervisor', 40000, 4);  

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Travis', 'Nichol', 2, null),
('David', 'Foster', 1, 1),
('Emily', 'Kaur', 4, null),
('Eugene', 'Nowak', 3, 3),
('Amorjit', 'Makkar', 6, null),
('Jaime', 'Serrano', 5, 5),
('Richard', 'Henrikson', 8, null),
('Marisol', 'Smith', 7, 7);