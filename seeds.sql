USE employee_trackerDB;

INSERT INTO department
    (name)
VALUES
    ('Accounting'),
    ('Aministration'),
    ('Management'),
    ('Humain Resources');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Marketing Associate', 46000, 3),
    ('Engineer', 120000, 2),
    ('Director', 140000, 1),
    ('Manager', 80000, 4);

INSERT INTO employee    
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Johnson', 1, 5),
    ('Sally', 'Mae', 2, 5),
    ('Andrea', 'Ivy', 3, 5),
    ('Justin', 'Kimberlin', 4, 5),
    ('Luca', 'Brown', 5, NULL);
