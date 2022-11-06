// Import and require mysql
const mysql = require("mysql");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Nalice95$",
    database: "employee_trackerDB",
  },
  console.log(`Connected to the employee_trackerDB database.`)
);

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "choiceType",
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
      if (answer.choiceType == "view all departments") {
        viewAllDepartement();
      } else if (answer.choiceType == "view all roles") {
        viewAllRolest();
      } else if (answer.choiceType == "view all employees") {
        viewAllEmployee();
      } else if (answer.choiceType == "add department") {
        addDepartement();
      } else if (answer.choiceType == "add roles") {
        addRoles();
      } else if (answer.choiceType == "add employee") {
        addEmployee();
      } else if (answer.choiceType == "update an employee role") {
        updateEmployeeRole();
      } else {
        process.exit();
      }
    });
}
// Function to view all departements
const showDepartement = () => {
  db.query("SELECT * FROM department", function (err, answers) {
    if (err) {
      console.log(err);
    }
    console.table(answers);
    choiceType();
  });
};

// Function to view all roles
const showRole = () => {
  db.query(
    "SELECT role.id AS id, role.jobs_title AS jobs_title, department.department_name AS department_name, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id;",
    function (err, answers) {
      if (err) {
        console.log(err);
      }
      console.table(answers);
      choiceType();
    }
  );
};

// Function to view all employee
const showEmployee = () => {
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
      choiceType();
    }
  );
};

// Function to add departement
const addDepartement = () => {
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
          console.log("Added departmnet");
          if (err) {
            console.log(err);
          }
          choiceType();
        }
      );
    });
};

// Function to add role
const addRoles = () => {
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
