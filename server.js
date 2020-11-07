const mysql = require("mysql");
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

function addDeparment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Add a department."
        }
    ]).then(answers => {
        connection.query(
            "INSERT INTO department SET ?",
            {
            name: answers.name,
            },
            function (err, res) {
                if (err) throw err
                console.table(res.affectedRows + " was posted!\n");
                startPrompt();
            })
    })
}
