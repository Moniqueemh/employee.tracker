
DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
 department_name VARCHAR
    (30) NOT NULL,
 PRIMARY KEY
    (id)
 );

    CREATE TABLE employee_role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
 title Varchar
        (30) NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INT NOT NULL,
 PRIMARY KEY
        (id),
 FOREIGN KEY
        (department_id) REFERENCES department
        (id)
 );

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
 first_name VARCHAR
            (30) NOT NULL,
 last_name VARCHAR
            (30) NOT NULL,
 role_id INT NOT NULL,
 manager_id INT NOT NULL,
 PRIMARY KEY
            (id),
 FOREIGN KEY
            (role_id) REFERENCES employee_role
            (id),
 FOREIGN KEY
            (manager_id) REFERENCES employee
            (id)
 );

            INSERT INTO department
                (department_name)
            VALUE
            ("Human Resources"),("Banking"),("IT Group");

            INSERT INTO employee_role
                (title, salary, department_id)
            VALUE
            ("Manager",
            100000.00,
            1
            )