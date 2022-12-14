// Import and require mysql
const inquirer = require("inquirer");
// const db = require("./db");

const mysql = require("mysql2");

console.log("connection");

// create the connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Nalice95$",
    database: "employee_trackerDB",
  },
  console.log("connected successfuly")
);

console.log("connected");
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "choiceType",
      message:
        "Please choose the option which you would like to continue with:",
      choices: [
        "view departments",
        "view roles",
        "view employees",
        "add department",
        "add role",
        "add employee",
        "update employee role",
      ],
    })

    .then(function (answer) {
      if (answer.choiceType == "view departments") {
        viewDepartements();
      } else if (answer.choiceType == "view roles") {
        viewRoles();
      } else if (answer.choiceType == "view employees") {
        viewEmployees();
      } else if (answer.choiceType == "add department") {
        addDepartement();
      } else if (answer.choiceType == "add role") {
        addRole();
      } else if (answer.choiceType == "add employee") {
        addEmployee();
      } else if (answer.choiceType == "update an employee role") {
        updateEmployeeRole();
      } else {
        process.exit();
      }
    });
}
// Function to view departments

const viewDepartements = () => {
  db.query("SELECT * FROM department", function (err, answers) {
    if (err) {
      console.log(err);
    }
    console.table(answers);
    choiceType();
  });
};

// Function to view roles
const viewRoles = () => {
  db.query(
    "SELECT role.title AS title, role.salary AS salary, department_id AS department_id FROM role LEFT JOIN department ON role.department_id = department.id;",
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      choiceType();
    }
  );
};

// Function to view employees
const viewEmployees = () => {
  db.query(
    `SELECT
  employee.first_name,
  employee.last_name,
  employee.id,
  department.name AS department.name,
  role.salary AS salary,
  role.title AS title,
  CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM
  employee
  LEFT JOIN role ON employee.id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON manager.id = employee.manager_id`,
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      choiceType();
    }
  );
};

// Function to add department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Add new department name: ",
        name: "department_name",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO department (department_name) VALUES (?)`,
        [answers.department_name],
        function (err, data) {
          console.log("Added department");
          if (err) {
            console.log(err);
          }
          choiceType();
        }
      );
    });
};

// Function to add role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: " Add new job title: ",
        name: "job_title",
      },
      {
        type: "input",
        message: "add salary",
        name: "salary",
      },
      {
        type: "input",
        message: "Add department id",
        name: "department_id",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO role (jobs_title, salary, department_id) VALUES (?,?,?)`,
        [answers.jobs_title, answers.salary, answers.department_id],
        (err, data) => {
          console.log(err);
          console.log("Add role");
          choiceType();
        }
      );
    });
};

//Function to add employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "add first name",
        name: "first_name",
      },
      {
        type: "input",
        message: "add last name",
        name: "last_name",
      },
      {
        type: "input",
        message: "add role id",
        name: "role_id",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`,
        [answers.first_name, answers.last_name, answers.role_id],
        (err, data) => {
          console.log(err);
          console.log("Add employee");
          choiceType();
        }
      );
    });
};

// Function to update employee role
const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Choose the employee ID you want to update",
        name: "employee_id",
      },
      {
        type: "input",
        message: "update role_id",
        name: "role_id",
      },
    ])
    .then((answers) => {
      db.query(
        `UPDATE employee SET role_id = ? WHERE id = ?`,
        [answers.role_id, answers.employee_id],
        (err, data) => {
          console.log(err);
          console.table("Update employee");
          choiceType();
        }
      );
    });
};

start();
