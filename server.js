const mysql = require('mysql');
const inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jackjack0307!",
    database: "employee_DB"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
    main()
});

function main() {
    connection.query("SELECT * FROM employee_db.department", function (err, res) {
        if (err) throw err;
        console.log(res);
    });
};

// prompt for choices//
function main() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "Add Department?",
                "Add Role?",
                "Add Employee?",
                "View by Department?",
                "View by Role?",
                "View by Employee?",
                "Update Employee Role?"
            ]
        }
    ]).then(function (answer) {
        switch (answer.choice) {
            case "Add Department?":
                addDeparment();
                break;

            case "Add Role?":
                addRole();
                break;

            case "Add Employee?":
                addEmployee();
                break;

            case "View by Department?":
                viewDepartment();
                break;

            case "View by Role?":
                viewRole();
                break;

            case "View by Employee?":
                viewEmployee();
                break;

            case "Update Employee Role?":
                update();
                break;

            case "exit":
                connection.end();
                break;
        }
    });
};

// prompt for adding department//
function addDeparment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Add a department."
        }
    ]).then(res => {
        connection.query(
            "INSERT INTO department (department_name) VALUE ('Human Resources'),('Banking'),('IT Group')",
            {
                name: res.department_name,
            },
            function (err, res) {
                if (err) throw err
                console.table(res);
                startPrompt();
            })
    })
};

// prompt for add role//
function addRole() {
    connection.query("SELECT * FROM employee_db.employee_role")
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the id?"
        }
    ]).then(res => {
        connection.query(
            "INSERT INTO employee_role (title, salary, department_id) VALUE('Manager', 100000.00, 1)",
            {
                title: res.title,
                salary: res.salary,
                id: res.department_id
            },
            function (err, res) {
                if (err) throw err
                console.table(res);
                startPrompt();
            })
    })
};

// prompt for adding employee//
function addEmployee() {
    connection.query("SELECT * FROM employee_db.employee")
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter first name."
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter last name."
        },
        {
            name: "role_id",
            type: "input",
            message: "What is their role?"
        },
        {
            name: "manager",
            type: "list",
            message: "Who is their manager?"
            //choices : managerList()
        }
    ]).then(res => {
        connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id)",
            {
                first_name: res.first_name,
                last_name: res.last_name,
                manager_id: res.manager_id,
                role_id: res.role_id
            },
            function (err, res) {
                if (err) throw err
                console.table(res);
                startPrompt();
            })
    })
};

// viewing department //
function viewDepartment() {
    connection.query("SELECT employee.first_name, employee.last_name, department.department_name AS Department FROM employee JOIN employee_role ON employee.role_id = employee_role.id JOIN department ON employee_role.department_id = department.id ORDER BY employee.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};

//viewing role //
function viewRole() {
    connection.query("SELECT employee.first_name, employee.last_name, employee_role.title AS Title FROM employee JOIN employee_role ON employee.role_id = employee_role.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })

};

function viewEmployee() {
    connection.query("SELECT employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN employee_role on employee_role.id = role_id INNER JOIN department on department.id = employee_role.department_id left join employee e on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })

};




