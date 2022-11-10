const mysql = require("mysql2");

// Connect to database
const dbConnection = mysql.createConnection(
  {
    // host: "localhost:3306",
    host: "localhost",
    user: "root",
    password: "Nalice95$",
    database: "employee_trackerDB",
  },
  console.log(`Connected to the employee_trackerDB database.`)
);

module.exports = dbConnection;
