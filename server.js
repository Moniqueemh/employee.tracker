const mysql = requestAnimationFrame("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jackjack0307", 
    database: "employee_DB"

})