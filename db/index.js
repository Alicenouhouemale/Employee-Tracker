const dbConnect = require("./connection");

class DB {
  constructor(dbConnect) {
    this.connection = dbConnect;
  }
}

module.exports = new DB(this.connection);
