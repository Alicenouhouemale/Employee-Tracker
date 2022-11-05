const express = require("express");
// Import and require mysql
const mysql = require("mysql");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Nalice95$",
    database: "employee_tracker",
  },
  console.log(`Connected to the employee_tracker database.`)
);

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message:
        "Please choose the option which you would like to continue with:",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add department",
        "add roles",
        "add employee",
        "update an employee role",
      ],
    })

    .then(function (answer) {
      if (answer.choice == "view all departments") {
        viewAllDepartement();
      } else if (answer.choice == "view all roles") {
        viewAllRolest();
      } else if (answer.choice == "view all employees") {
        viewAllEmployee();
      } else if (answer.choice == "add department") {
        addDepartement();
      } else if (answer.choice == "add roles") {
        addRoles();
      } else if (answer.choice == "add employee") {
        addEmployee();
      } else if (answer.choice == "update an employee role") {
        updateEmployeeRole();
      } else {
        process.exit();
      }
    });
}
