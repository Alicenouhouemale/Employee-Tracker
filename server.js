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
//To view all departements
const viewAllDepartement = () => {
  db.query("SELECT * FROM department", function (err, answers) {
    if (err) {
      console.log(err);
    }
    console.table(answers);
    choice();
  });
};

//To view all roles
const viewAllRolest = () => {
  db.query(
    "SELECT role.id AS id, role.jobs_title AS jobs_title, department.department_name AS department_name, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id;",
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      choice();
    }
  );
};

//To view all employees
const viewAllEmployee = () => {
  db.query(
    `SELECT
  employee.id,
  employee.first_name,
  employee.last_name,
  department.department_name AS department_name,
  role.salary AS salary,
  role.jobs_title AS jobs_title,
  CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM
  employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON manager.id = employee.manager_id`,
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      choice();
    }
  );
};

//To add departement
const addDepartement = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "add the new department name: ",
        name: "department_name",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO department (department_name) VALUES (?)`,
        [answers.department_name],
        function (err, data) {
          console.log("Added departmnet");
          if (err) {
            console.log(err);
          }
          menu();
        }
      );
    });
};
